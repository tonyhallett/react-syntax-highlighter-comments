import * as React from "react";
const sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet! as CSSStyleSheet;
})();
export interface DemoTypeProps{
  keyframesAnimation:string,
  animationCss:string,
  id:string,
  color:string,
  customMessage:string,
  displayCustomMessage:boolean,
  fontSize:number,
  additionalMessages:any
}
export class DemoTypeComponent extends React.Component<DemoTypeProps> {
  constructor(props: any) {
    super(props);
    this.insertRules();
  }
  insertRules() {
    //must do in multiple calls or exception
    sheet.insertRule(this.props.animationCss);
    sheet.insertRule(this.props.keyframesAnimation);
  }
  componentDidUpdate() {
    sheet.deleteRule(0);
    sheet.deleteRule(0);
    this.insertRules();
  }
  getAdditionalMessages() {
    return this.props.additionalMessages && this.props.additionalMessages instanceof Array ?
      this.props.additionalMessages.filter(am => typeof am === 'string')
        .map((am, i) => <span style={{ color: 'green' }} key={i}>{am}</span>)
      : undefined;
  }
  render() {
    return <React.Fragment>
      <span style={{ color: this.props.color, fontSize: this.props.fontSize }} id={this.props.id}>{this.props.displayCustomMessage ? this.props.customMessage : 'Hello'}
      </span>
      {this.getAdditionalMessages()}
    </React.Fragment>;
  }
}
