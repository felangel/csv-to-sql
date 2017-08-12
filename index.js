var fs = require('fs');
var columns = [
	"Restaurant",
	"Type of Food",
	"Item",
	"Search Filter",
	"Dietary Information",
	"Serving Size",
	"Calories",
	"Calories from Fat",
	"Total Fat (g)",
	"Saturated Fat (g)",
	"Trans Fat (g)",
	"Cholesterol (mg)",
	"Sodium (mg)",
	"Carbohydrates (g)",
	"Dietary Fiber (g)",
	"Sugars (g)",
	"Protein (g)",
	"Vitamin A",
	"Vitamin C",
	"Calcium",
	"Iron",
	"Allergen Information",
	"Potassium (mg)",
	"Vitamin B6",
	"Vitamin B12",
	"Vitamin E",
	"Polyunsaturated Fat (g)",
	"Monounsaturated Fat (g)"
];
var nonVegetarianKeywords = [
	'ahi',
	'angus',
	'artic char',
	'bacon',
	'barramundi',
	'bass',
	'barbacoa',
	'breast',
	'butterburger',
	'beef',
	'bLT',
	'bone',
	'calamari',
	'carnita',
	'catfish',
	'cheeseburger',
	'corndog',
	'corn dog',
	'chicken',
	'chili',
	'chorizo',
	'clam',
	'cod',
	'corvina',
	'crab',
	'egg',
	'filet',
	'Fish',
	'grouper',
	'ham',
	'hamburger',
	'halibut',
	'hotdog',
	'hot dog',
	'jambalaya',
	'jerk',
	'lamb',
	'link',
	'lobster',
	'mignon',
	'mahi mahi',
	'meat',
	'nugget',
	'omelet',
	'opah',
	'octopus',
	'pepperoni',
	'pepperoncini',
	'pork',
	'pulled',
	'prime',
	'road kill',
	'reuben',
	'rib',
	'salmon',
	'sashimi',
	'sausage',
	'scampi',
	'sirloin',
	'shrimp',
	'sourdough',
	'steak',
	'squid',
	'sushi',
	'swordfish',
	'tenders',
	'tilapia',
	'turkey',
	'tuna',
	'whitefish',
	'wing',
	'veal',
	'ziti'
];

var lineNumber = 2;
var duplicates = {};
var badData = [];
var validate = false;
var calorieThreshold = 50;

fs.readFile('./input.txt', 'utf8', function(err, data) {
	if(err) throw err;
	parseCSV(data);
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

		var foodchain = info[0];
		var type = info[1];
		var name = info[2];
		var searchFilter = `${info[3]}${isNonVegetarian(name) ? ';Non-Vegetarian' : ''}`
		var dietaryInfo = info[4];
		var servingSize = info[5];
		var calories = isNumeric(removeWhiteSpace(6)) ? removeWhiteSpace(6): 0;
		var cff = isNumeric(removeWhiteSpace(7)) ? removeWhiteSpace(7): 0;
		var fat = isNumeric(removeWhiteSpace(8)) ? removeWhiteSpace(8): 0;
		var sfat = isNumeric(removeWhiteSpace(9)) ? removeWhiteSpace(9): 0;
		var tfat = isNumeric(removeWhiteSpace(10)) ? removeWhiteSpace(10): 0;
		var cholesterol = isNumeric(removeWhiteSpace(11)) ? removeWhiteSpace(11): 0;
		var sodium = isNumeric(removeWhiteSpace(12)) ? removeWhiteSpace(12): 0;
		var carbs = isNumeric(removeWhiteSpace(13)) ? removeWhiteSpace(13): 0;
		var fiber = isNumeric(removeWhiteSpace(14)) ? removeWhiteSpace(14): 0;
		var sugar = isNumeric(removeWhiteSpace(15)) ? removeWhiteSpace(15): 0;
		var protein = isNumeric(removeWhiteSpace(16)) ? removeWhiteSpace(16): 0;
		var vitA = isNumeric(removeWhiteSpace(17)) ? removeWhiteSpace(17): 0;
		var vitC = isNumeric(removeWhiteSpace(18)) ? removeWhiteSpace(18): 0;
		var calcium = isNumeric(removeWhiteSpace(19)) ? removeWhiteSpace(19): 0;
		var iron = isNumeric(removeWhiteSpace(20)) ? removeWhiteSpace(20): 0;
		var allergenInfo = info[21];
		var potassium = isNumeric(removeWhiteSpace(22)) ? removeWhiteSpace(22): 0;
		var vitB6 = isNumeric(removeWhiteSpace(23)) ? removeWhiteSpace(23): 0;
		var vitB12 = isNumeric(removeWhiteSpace(24)) ? removeWhiteSpace(24): 0;
		var vitE = isNumeric(removeWhiteSpace(25)) ? removeWhiteSpace(25): 0;
		var pufat = isNumeric(removeWhiteSpace(26)) ? removeWhiteSpace(26): 0;
		var mufat = isNumeric(removeWhiteSpace(27)) ? removeWhiteSpace(27): 0;
		
		var sql = 'INSERT INTO `Food` Values(NULL,"' + 
			foodchain + '","' + type + '","' + searchFilter + '","' +
			name + '","' + dietaryInfo + '","' + servingSize + '",' + 
			calories + ',' + cff + ',' + fat + ',' + 
			sfat + ',' + tfat + ',' + cholesterol + ',' + 
			sodium + ',' + carbs + ',' + fiber + ',' + 
			sugar + ',' + protein  + ',' + vitA + ',' + vitC + ',' + calcium + ',' +
			iron + ',"' + allergenInfo + '",' + potassium + ',' + vitB6 + ',' +
			vitB12 + ',' + vitE + ',' + pufat + ',' + mufat + ');';
		
		if(type !== 'Others') {
			if(!(duplicates.hasOwnProperty(name) && duplicates[name].calories === calories && duplicates[name].foodchain === foodchain)) {
				if(!validate) {
					console.log(sql);
				}
				duplicates[name] = {calories: calories, foodchain: foodchain};
			}
			if(Math.abs(calories - macrosToCalories(fat, carbs, protein)) >= calorieThreshold) {			
				var badDataString = `${foodchain},${name},${calories},${carbs},${fat},${protein}\n`;
				badData.push(badDataString);
			}
		}
		lineNumber++;
	}
	
	if(validate && badData.length) {
		var headerList = 'foodchain, name, calories, carbs, fat, protein\n';
		console.log(headerList + badData.join(''));
	}

	function removeWhiteSpace(index) {
		let str = info[index];
		if(!str) {
			console.log('error in column ' + columns[index] + ' on line ' + lineNumber);
		}
		return str.replace(/\s/g, "");
	}
}

function isNumeric(obj) {
	return !isNaN(obj - parseFloat(obj));
}

function macrosToCalories(fat, carbs, protein) {
	return ((fat * 9) + (carbs * 4) + (protein * 4));
}

function isNonVegetarian(name) {	
	let words = name.split(' ');
	for(var i = 0; i < words.length; i++) {
		let word = words[i];
		if(nonVegetarianKeywords.includes(word.toLowerCase())) {
			return true;
		}
	};
	return false;
}