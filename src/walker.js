import Translator from './translator';

export default class Walker {
	constructor(root) {
		this.root = root;
		this.translator = new Translator();
	}

	walk(node) {
		var child, next;
		switch ( node.nodeType ) {
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while ( child ) {
					next = child.nextSibling;
					this.walk(child);
					child = next;
				}
				break;

			case 3: // Text node
				this.translator.translate(node);
				break;
		}
	}
	
  walkRoot() {
		this.walk(this.root);
	}

}
