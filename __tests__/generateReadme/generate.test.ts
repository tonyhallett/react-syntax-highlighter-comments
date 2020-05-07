import generate from '../../scripts/generateReadMe/generate';
import { Demo } from '../../scripts/generateReadMe/interfaces';
import { AssetManager} from '../../scripts/generateReadMe/AssetManager';
import { ImageGeneratorFromFile} from '../../scripts/generateReadMe/ImageGeneratorFromFile';
import { GeneratedReadme} from '../../scripts/generateReadMe/GeneratedReadme';
import { GeneratedReadmeWriter} from '../../scripts/generateReadMe/GeneratedReadmeWriter';
jest.mock('../../scripts/generateReadMe/AssetManager');
jest.mock('../../scripts/generateReadMe/ImageGeneratorFromFile');
jest.mock('../../scripts/generateReadMe/GeneratedReadme');
jest.mock('../../scripts/generateReadMe/GeneratedReadmeWriter');

const MockAssetManager = AssetManager as jest.MockedClass<typeof AssetManager>;
const MockGeneratedReadmeWriter = GeneratedReadmeWriter as jest.MockedClass<typeof GeneratedReadmeWriter>;
const MockImageGeneratorFromFile = ImageGeneratorFromFile as jest.MockedClass<typeof ImageGeneratorFromFile>;

interface Constructable {
  new (...args: any[]): any;
}
class MockReturnValueOnces<T>{
  private constructor(public readonly values:Array<T>){}
  static create<T>(values:Array<T>){
    return new MockReturnValueOnces(values);
  }

}
function setMockedMethod(mocked:any,method:any,implOrReturn:any){
  if(jest.isMockFunction(implOrReturn)){
    mocked[method] = implOrReturn;
  }else{
    if(implOrReturn instanceof MockReturnValueOnces){
      implOrReturn.values.forEach(mockReturnValueOnce => {
        mocked[method].mockReturnValueOnce(mockReturnValueOnce);
      });
    }else{
      mocked[method].mockReturnValue(implOrReturn);
    }
    
  }
}

//Partial !

type NonUndefined<A> = A extends undefined ? never : A;
type FunctionKeys<T extends object> = {
  [K in keyof T]-?:NonUndefined<T[K]> extends Function ? K :never
}[keyof T];


type PropOrReturn<T extends object> =  {
  [P in FunctionKeys<T>]: T[P]|ReturnType<T[P]>|MockReturnValueOnces<ReturnType<T[P]>>
};
type PartialPropOrReturn<T extends object> = Partial<PropOrReturn<T>>

function createInstanceAndChangeMethods<T extends Constructable>(
  mockClass:jest.MockedClass<T>,
  implementations:PartialPropOrReturn<InstanceType<T>>
  ):InstanceType<T>{
  const instance = new mockClass();
  Object.keys(implementations).forEach(key => {
    const impl = (implementations as any)[key];
    setMockedMethod(instance,key,impl);
  })
  return instance;
}

function createInstanceAndChangeMethod<T extends Constructable,U extends keyof InstanceType<T>>(
  mockClass:jest.MockedClass<T>,
  method:U,
  implOrReturn:InstanceType<T>[U]|ReturnType<InstanceType<T>[U]>):InstanceType<T>{

  const instance = new mockClass();
  setMockedMethod(instance,method, implOrReturn);

  return instance;
}
function create<T extends Constructable>(
  mockClass:jest.MockedClass<T>
):InstanceType<T>{
  return new mockClass();
}

describe('createInstanceAndChangeMethod/s', () => {
  it('works', () => {
    const getComponentImagePath = jest.fn();
    let mockAssetManager = createInstanceAndChangeMethods(MockAssetManager,{getComponentImagePath});
    mockAssetManager.getComponentImagePath();
    expect(getComponentImagePath).toHaveBeenCalledWith();

    mockAssetManager = createInstanceAndChangeMethods(MockAssetManager,{getComponentImagePath:MockReturnValueOnces.create(['1','2'])});
    expect(mockAssetManager.getComponentImagePath()).toBe('1');
    expect(mockAssetManager.getComponentImagePath()).toBe('2');

    getComponentImagePath.mockClear();
    new MockAssetManager(null as any).getComponentImagePath();
    expect(getComponentImagePath).not.toHaveBeenCalled();

    mockAssetManager = createInstanceAndChangeMethod(MockAssetManager,'getComponentImagePath',getComponentImagePath);
    mockAssetManager.getComponentImagePath();
    expect(getComponentImagePath).toHaveBeenCalled();

    mockAssetManager = createInstanceAndChangeMethod(MockAssetManager,'getComponentImagePath','Mock return value');
    expect(mockAssetManager.getComponentImagePath()).toBe('Mock return value');
    expect(mockAssetManager.getComponentImagePath()).toBe('Mock return value');
    
  })
})
describe('generate', () => {
  it('should clean component images',async () => {
    const cleanComponentImages= jest.fn();
    await generate(
      {
        getComponentInfos(){
          return Promise.resolve([]);
        },
        readSurroundingReadme(){},
        cleanComponentImages
      } as any, {
        surroundWith(){},
      } as any,
      {
        write(){}
      } as any,
      null as any
    )
    expect(cleanComponentImages).toHaveBeenCalled();
  })
  describe('asset manager component infos', () => {
    it('should get the component infos from the asset manager', async () => {
      const getComponentInfos= jest.fn().mockReturnValue(Promise.resolve([]));
      await generate(
        {
          cleanComponentImages(){},
          readSurroundingReadme(){},
          getComponentInfos
        } as any, {
          surroundWith(){},
        } as any,
        {
          write(){}
        } as any,
        null as any
      )
      expect(getComponentInfos).toHaveBeenCalled();
    })

    describe('for each', () => {
      it('should generate the image from the component folder in the images folder',async () => {
        
        const imageGenerate = jest.fn();
        const componentInfos:Demo[] = [
          {
            name:'First',
            folderPath:'FolderPath1',
            codeDetails:{
              code:'',
              language:''
            },
            readme:''
          },
          {
            name:'Second',
            folderPath:'FolderPath2',
            codeDetails:{
              code:'',
              language:''
            },
            readme:''
          }
        ];
        await generate(
          {
            cleanComponentImages(){},
            readSurroundingReadme(){},
            getComponentInfos(){return Promise.resolve(componentInfos)},
            getComponentImagePath(png:string){
              return `relative/${png}`
            }

          } as any, {
            surroundWith(){},
            addDemo(){}
          } as any,
          {
            write(){},
            getRelativePath(){}
          } as any,
          {
            generate:imageGenerate
          }
        )
        expect(imageGenerate).toHaveBeenNthCalledWith<[string,string]>(1,'FolderPath1','relative/First.png');
        expect(imageGenerate).toHaveBeenNthCalledWith<[string,string]>(2,'FolderPath2','relative/Second.png');
      });

      describe('should be added to the generated read me', () => {
        const componentInfos:Demo[] = [
          {
            codeDetails:{
              code:'code1',
              language:'l1'
            },
            folderPath:'FolderPath1',
            name:'Name1',
            readme:'readme1'
          },
          {
            codeDetails:{
              code:'code2',
              language:'l2'
            },
            folderPath:'FolderPath2',
            name:'Name2',
            readme:'readme2'
          }
        ]
        let generatedReadme:GeneratedReadme
        beforeEach(()=>{
          const getComponentImagePath = jest.fn().mockReturnValueOnce('ImagePath1').mockReturnValueOnce('ImagePath2');
          const assetManager = createInstanceAndChangeMethods(MockAssetManager,
            {
              getComponentInfos:Promise.resolve(componentInfos),
              getComponentImagePath
            }
          );

          generatedReadme = new GeneratedReadme();

          const generatedReadmeWriter = createInstanceAndChangeMethod(
            MockGeneratedReadmeWriter,
            'getRelativePath',
            jest.fn(componentImagePath => `relative/${componentImagePath}`)
          );
          generate(assetManager,generatedReadme,generatedReadmeWriter,create(MockImageGeneratorFromFile));
        })
        it('should add the code details', () => {
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(1,componentInfos[0].codeDetails,expect.anything(),expect.anything());
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(2,componentInfos[1].codeDetails,expect.anything(),expect.anything());
        })
        it('should add the readme', () => {
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(1,componentInfos[0].codeDetails,componentInfos[0].readme,expect.anything());
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(2,componentInfos[1].codeDetails,componentInfos[1].readme,expect.anything());
        })
        it('should add the relative component image path', () => {
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(1,componentInfos[0].codeDetails,componentInfos[0].readme,expect.objectContaining({componentImagePath:'relative/ImagePath1'}));
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(2,componentInfos[1].codeDetails,componentInfos[1].readme,expect.objectContaining({componentImagePath:'relative/ImagePath2'}));
        })
        it('should add the component name as the alt text', () => {
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(1,componentInfos[0].codeDetails,componentInfos[0].readme,expect.objectContaining({altText:componentInfos[0].name}));
          expect(generatedReadme.addDemo).toHaveBeenNthCalledWith<Parameters<GeneratedReadme['addDemo']>>(2,componentInfos[1].codeDetails,componentInfos[1].readme,expect.objectContaining({altText:componentInfos[1].name}));
        })
      })
    })
  })
  
  it('should surround the generated readme with pre and post readme', async () => {
    const surroundWith = jest.fn();
    await generate(
      {
        cleanComponentImages(){},
        readSurroundingReadme(pre:boolean){
          return pre?'Pre':'Post';
        },
        getComponentInfos(){return Promise.resolve([])}
      } as any, {
        surroundWith
      } as any,
      {
        write(){}
      } as any,
      null as any
    )
    expect(surroundWith).toHaveBeenCalledWith('Pre','Post');
  })
  it('should write the generated read me', async () => {
    const write= jest.fn();
    const generatedReadMe = {
      surroundWith(){},
    }
    await generate(
      {
        cleanComponentImages(){},
        readSurroundingReadme(){},
        getComponentInfos(){return Promise.resolve([])}
      } as any, 
      generatedReadMe as any,
      {
        write
      } as any,
      null as any
    )
    expect(write.mock.calls[0][0]).toBe(generatedReadMe);
  })
});

// create an integration test ?