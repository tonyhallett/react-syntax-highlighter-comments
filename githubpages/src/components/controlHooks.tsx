import * as React from "react";
export function useLabelCheckbox(labelText:string, initialChecked=true):[JSX.Element,boolean]{
  const [checked, setChecked] = React.useState(initialChecked);
  return [
  <label style={{display:'block'}}><input type='checkbox' checked={checked} onChange={evt=>setChecked(evt.target.checked)}/>{labelText}</label>,
    checked
  ]
}
export function useLabelTextbox(labelText:string, initialText=''):[JSX.Element,string]{
  const [text, setText] = React.useState(initialText);
  return [
  <label style={{display:'block'}}><input type='text' value={text} onChange={evt=>setText(evt.target.value)}/>{labelText}</label>,
    text
  ]
}
export function useLabelRadios(labels:string[],initialSelected = ''):[JSX.Element[],string]{
  const [selectedOption, setSelectedOption] = React.useState(initialSelected);
  return [
    labels.map((l,i) => {
      return <label key={i}>
        <input onChange={evt=>setSelectedOption(evt.target.value)} type="radio" value={l} checked={selectedOption === l} />
        {l}
    </label>
    }),selectedOption
  ]
}