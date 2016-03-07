console.log('Starting process')


console.log('Remove previous results')
const fs = require('fs')
const outputPath = 'output.txt'
try {
	fs.unlinkSync(outputPath)
} catch(e) {
	console.log('No output file to remove')
}


console.log('Setting input file')
var targetPath = 'utterances.example.txt'
if (process.argv.length < 3 || process.argv[2] === 'index.js') {
	console.log('No input file provided, using default.')
} else {
	targetPath = process.argv[2]
}
console.log('Input file:', targetPath)



const ident = 'From file <'
const ident2 = 'Number of: utterances ='
const path = require('path')

var results = []
fs.readFile(targetPath, 'utf8', (err, data) => {
  if (err) throw err
	var lines = data.split('\n')

	for(var i=0; i<lines.length; i++) {
		var line = lines[i]
		if (line.indexOf(ident) === -1) {
			continue
		}

		var file = line.substring(ident.length, line.length-2)
		var p = path.win32.parse(file).name
		results.push(p)
	}

	var count = 0
	for(var d=0; d<lines.length; d++) {
		var line = lines[d]
		if (line.indexOf(ident2) === -1) {
			continue
		}

		line = line.split('=')
		var utterances = parseInt(line[1].split(',')[0])
		results[count] += '\t' + utterances
		count++
	}

	fs.appendFile(outputPath, results.join('\n'), function (err) {
		if (err) {
			console.log('Could not write to output.txt')
			return
		}

		console.log('Process finished')
	})
})
