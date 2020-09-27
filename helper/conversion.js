const hexSymbols = {
	'A': 10,
	'B': 11,
	'C': 12,
	'D': 13,
	'E': 14,
	'F': 15
}

const hexNumbers = {
	10: 'A',
	11: 'B',
	12: 'C',
	13: 'D',
	14: 'E',
	15: 'F'
}

function convertToBinary(numb) {
	let rests = [], quo = numb;

	do {
		rests.push(quo % 2)
		
		quo = parseInt(quo / 2)
		
		if (quo < 2 && quo > 0) {
			rests.push(quo)
		}
		
	} while(quo >= 2)
	
	return rests.reverse().join('');
}

function convertToDecimal(base, numb) {
	let res = 0;
	
	const numbs = numb.toString().split('').reverse();
		
	for (let i = 0; i < numbs.length; i++) {
		const n = hexSymbols[numbs[i].toUpperCase()] ?? numbs[i];
		res = res + n * base ** i;
	}
	
	return res
}

function binaryFor(base, numb) {
	let res = 0;
	
	if (base === 10) {
		res = convertToDecimal(2, numb)
	}else {
		res = '';
		const numbs = [], digits = numb.split(''), relacion = base === 16 ? 4 : 3;
		
		while(digits.length > 0) {
			numbs.unshift(digits.splice(-relacion))
		}
		
		//Array of arrays
		for (const numArray of numbs) {
			let result = 0
			
			numArray.reverse()

			for (let n = 0; n < numArray.length; n++) {
				result += numArray[n] * 2 ** n
			}
			
			res = (base === 16 && result > 9) ? res + hexNumbers[result] : res + result;
			result = 0
		}
	}
	
	return res
}

function decimalFor(base, numb) {
	let rests = [], quo = numb;

	do {
		const rest = (base === 16 && quo % base > 9) ? hexNumbers[quo % base] : quo % base;
		rests.push(rest)
		
		quo = parseInt(quo / base)
		
		if (quo < base && quo > 0) {
			rests.push(quo)
		}
		
	} while(quo >= base)
	
	return rests.reverse().join('');
}

function octalFor(base, numb) {
	let res = ''
	
	if (base === 10) {
		res = convertToDecimal(8, numb)
	}
	
	if (base === 2 || base === 16) {
		let numbs = numb.split('')
		numbs = numbs.map(n => convertToBinary(n).padStart(3, 0))
		
		//turns into a string and removes the leading zeros
		res = numbs.join('').replace(/^[0]*/, '')
	}
	
	if (base === 16) {
		res = binaryFor(16, res)
	}
	
	return res
}

function hexadecimalFor(base, numb) {
	let res;
	const numbs = numb.split('').map(n => hexSymbols[n.toUpperCase()] ?? n)

	if (base === 2 || base === 8) {
		const binaries = numbs.map(n => convertToBinary(n).padStart(4, 0))
		
		res = binaries.join('').replace(/^[0]*/, '')
	}
	
	if (base === 10) {
		res = convertToDecimal(16, numb)
	}
	
	if (base === 8) {
		res = binaryFor(8, res)
	}
	
	return res
}

export { binaryFor, decimalFor, octalFor, hexadecimalFor }