export { CommentNodeRenderDetails,CommentRenderInterceptor,createCommentNodeRenderInterceptor,createCommentStyleCreator} from './helpers/commentHofs'
export { CaptureChar, ProcessResult, commentSymbolParser} from './helpers/commentSymbolParser'
export { StringToObjectCaptureChar } from './helpers/StringToObjectCaptureChar'

export { commentClassProvider} from './interceptors/commentClassProvider'
export * from './interceptors/commentTagInterceptor'
export { splitCommentChars, dollarCommentSplitter} from './interceptors/commentSplitters'
export { createNodeObjectPropertyAttacher} from './interceptors/nodeObjectPropertyAttacher'
export { commentLinkInterceptorTargetBlank, commentLinkInterceptorTargetSelf} from './interceptors/links/commentLinkInterceptor'
export { createCommentRemover} from './interceptors/removal/commentRemover';
export { tripleExclamationCommentRemover} from './interceptors/removal/tripleExclamationCommentRemover'
export { createTypeInterceptor } from './interceptors/type/typeInterceptor'

export { commentColourer, commentColourRenderer} from './stylers/colourers/commentColourer'
export { createTripleAsteriskCommentColourer, redTripleAsteriskCommentColourer} from './stylers/colourers/tripleAsteriskCommentColourer'
export { createCommentMatchReplaceStylerRegexString, createCommentMatchNOrMoreReplaceStyler, createCommentMatchReplaceStyler, CommentMatchReplaceStyler} from './stylers/styler creators/createCommentMatchReplaceStyler'
export { inlineStyler} from './stylers/inlineStyler'
export { referenceStyler} from './stylers/referenceStyler'
export { createCommentCharsStyler, CommentCharsStylingOptions } from './stylers/commentCharsStyler'

export * from './commentComponents'
