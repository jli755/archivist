var TABLE_EXAMPLE_URL="http://localhost:9000/#/table-example",TableExamplePageNode=function(e){var t='//*[@id="tree-root"]/tbody/tr[contains(@class,"angular-ui-tree-node")]'+"["+e+"]",n=by.css("[ui-tree-handle]"),a=element(by.xpath(t)),o=a.all(n).first();this.getElement=function(){return a},this.getHandle=function(){return o},this.getText=function(){return a.getText()}},TableExamplePage=function(){this.get=function(){browser.get(TABLE_EXAMPLE_URL)},this.getRootNodes=function(){return element.all(by.repeater("node in data"))},this.getNodeAtPosition=function(e){return new TableExamplePageNode(e)}};module.exports=new TableExamplePage;