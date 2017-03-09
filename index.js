var fs = require('fs');

fs.readFile('./input.txt', 'utf8', function(err, data) {
	if(err) throw err;
	let sql = parseCSV(data);
	console.log(sql);
});

function parseCSV(csv) { 
	var lines = csv.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var info = line.split(',');
		
		for(var j = 0; j < info.length; j++) {
			if(!info[j]) {
				info[j] = 0;
			}
		}

		/*
			0 Restaurant,
			1 Type of Food,
			2 Item,
			3 Dietary Information,
			4 Serving Size,
			5 Calories,
			6 Calories from Fat,
			7 Total Fat (g),
			8 Saturated Fat (g),
			9 Trans Fat (g),
			10 Cholesterol (mg),
			11 Sodium (mg),
			12 Carbohydrates (g),
			13 Dietary Fiber (g),
			14 Sugars (g),
			15 Protein (g),
			16 Vitamin A,
			17 Vitamin C,
			18 Calcium,
			19 Iron,
			20 Allergen Information,
			21 Potassium (mg),
			22 Vitamin B6,
			23 Vitamin B12,
			24 Vitamin E,
			25 Polyunsaturated Fat (g),
			26 Monounsaturated Fat (g)
		*/

		var foodchain = info[0];
		var type = info[1];
		var name = info[2];
		var dietaryInfo = info[3];
		var servingSize = info[4];
		var calories = removeWhiteSpace(info[5]) !== '-' ? info[5]: 0;
		var cff = removeWhiteSpace(info[6]) !== '-' ? info[6]: 0;
		var fat = removeWhiteSpace(info[7]) !== '-' ? info[7]: 0;
		var sfat = removeWhiteSpace(info[8]) !== '-' ? info[8]: 0;
		var tfat = removeWhiteSpace(info[9]) !== '-' ? info[9]: 0;
		var cholesterol = removeWhiteSpace(info[10]) !== '-' ? info[10]: 0;
		var sodium = removeWhiteSpace(info[11]) !== '-' ? info[11]: 0;
		var carbs = removeWhiteSpace(info[12]) !== '-' ? info[12]: 0;
		var fiber = removeWhiteSpace(info[13]) !== '-' ? info[13]: 0;
		var sugar = removeWhiteSpace(info[14]) !== '-' ? info[14]: 0;
		var protein = removeWhiteSpace(info[15]) !== '-' ? info[15]: 0;
		var vitA = removeWhiteSpace(info[16]) !== '-' ? info[16]: 0;
		var vitC = removeWhiteSpace(info[17]) !== '-' ? info[17]: 0;
		var calcium = removeWhiteSpace(info[18]) !== '-' ? info[18]: 0;
		var iron = removeWhiteSpace(info[19]) !== '-' ? info[19] : 0;
		var allergenInfo = info[20];
		var potassium = removeWhiteSpace(info[21]) !== '-' ? info[21] : 0;
		var vitB6 = removeWhiteSpace(info[22]) !== '-' ? info[22] : 0;
		var vitB12 = removeWhiteSpace(info[23]) !== '-' ? info[23] : 0;
		var vitE = removeWhiteSpace(info[24]) !== '-' ? info[24] : 0;
		var pufat = removeWhiteSpace(info[25]) !== '-' ? info[25] : 0;
		var mufat = removeWhiteSpace(info[26]) !== '-' ? info[26] : 0;

		var sql = 'INSERT INTO `Food` Values(NULL,"' + 
			foodchain + '","' + type + '","' + 
			name + '","' + dietaryInfo + '","' + servingSize + '",' + 
			calories + ',' + cff + ',' + fat + ',' + 
			sfat + ',' + tfat + ',' + cholesterol + ',' + 
			sodium + ',' + carbs + ',' + fiber + ',' + 
			sugar + ',' + protein  + ',' + vitA + ',' + vitC + ',' + calcium + ',' +
			iron + ',"' + allergenInfo + '",' + potassium + ',' + vitB6 + ',' +
			vitB12 + ',' + pufat + ',' + mufat + ');';
		console.log(sql);
	}

	function removeWhiteSpace(str) {
		return str.replace(/\s/g, "");
	}
}