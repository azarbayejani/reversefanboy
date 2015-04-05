// I stole all this code from Cloud-to-butt.
// https://github.com/panicsteve/cloud-to-butt

walk(document.body);

function walk(node) {
	var child, next;
	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;

	v = handleBrand(v);

	v = handlePhone(v);	

	textNode.nodeValue = v;
}

function handleBrand(text) {
	var v = text;
	v = v.replace(/\b(Apple|Samsung)\b/g, function($1) {
		return $1 === "Apple" ? "Samsung" : "Apple";
	});
	v = v.replace(/\b(APPLE|SAMSUNG)\b/g, function($1) {
		return $1 === "APPLE" ? "SAMSUNG" : "APPLE";
	});
	v = v.replace(//g,"Samsung ");
	return v;
}

function handlePhone(text) {
	var v = text;

	v = v.replace(/\b(((Galaxy S)((\d)|(\sI+))?)|(iPhone))\b/ig, function($1,$2,$3,$4,$5, $6, $7, $8) {
		var retValue = "Galaxy S";

		if ($4) {
			retValue = ($4.toUpperCase() === "GALAXY S" ? "iPhone" : "iPhone ");
		}
		if($6) { retValue = retValue + " " + $6 }
		if ($7) {
			var countI = $7.split('').length - 1;
			retValue = retValue + " " + countI;
		}

		return retValue;
	});

	return v;
}