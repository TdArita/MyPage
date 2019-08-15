setInterval(function() {
	var progress = document.querySelector('.progress')
	var a = new Date()
	var b = a.getTime()
	var c = (b - Date.parse('01 Jan 2019 00:00:00 GMT')) / ( Date.parse('01 Jan 2020 00:00:00 GMT') - Date.parse('01 Jan 2019 00:00:00 GMT'))
	c = Math.floor(c*100000000)
	c = parseInt(c)
	console.log(c)
	var d = document.getElementById('time')
	var e = a.toLocaleString()
	d.innerHTML = "</br></br></br>" + "现在是" + e + "</br></br></br>" + "这一年已过去" + c/1000000 + "%" + "</br></br></br>" 
	progress.style.width = c/1000000 + "%"
}, 100)
