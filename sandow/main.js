const ex = [
	{
		id: 1,
		img: ["./img/1-1.png", "./img/1-2.png"],
		reps_min: 50,
		reps_max: 120,
		reps_inc: 5,
		duration_ms: 2000
	},
	{
		id: 2,
		img: ["./img/2-2.png"],
		reps_min: 25,
		reps_inc: 2,
		duration_ms: 2000
	},
	{
		id: 3,
		img: ["./img/3-1.png", "./img/3-2.png"],
		reps_min: 10,
		reps_inc: 1,
		duration_ms: 2000
	},
	{
		id: 4,
		img: ["./img/4-1.png", "./img/4-2.png"],
		reps_min: 10,
		reps_inc: 0.333,
		duration_ms: 2000
	},
	{
		id: 5,
		img: ["./img/5-1.png", "./img/5-2a.png", "./img/5-2b.png"],
		reps_min: 5,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 6,
		img: ["./img/6-2.png"],
		reps_min: 15,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 7,
		img: ["./img/7-1.png", "./img/7-2.png"],
		reps_min: 10,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 8,
		img: ["./img/8-1.png", "./img/8-2.png"],
		reps_min: 20,
		reps_inc: 1,
		duration_ms: 2000
	},
	{
		id: "9-10",
		img: ["./img/9-1.png", "./img/9-2.png"],
		reps_min: 20,
		reps_inc: 1,
		duration_ms: 2000
	},
	{
		id: "11-12",
		img: ["./img/11-1.png", "./img/11-2a.png", "./img/11-2b.png", "./img/12-2.png"],
		reps_min: 20,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 13,
		img: ["./img/13-1.png", "./img/13-2a.png", "./img/13-2b.png"],
		reps_min: 3,
		reps_inc: 0.333,
		duration_ms: 2000
	},
	{
		id: 14,
		img: ["./img/14-2a.png", "./img/14-2b.png"],
		reps_min: 2,
		reps_inc: 0.333,
		duration_ms: 2000
	},
	{
		id: 15,
		img: ["./img/15-1.png"],
		reps_min: 3,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 16,
		img: ["./img/16-1.png"],
		reps_min: 10,
		reps_inc: 0.5,
		duration_ms: 2000
	},
	{
		id: 17,
		img: ["./img/17-1.png"],
		reps_min: 15,
		reps_inc: 0.5,
		duration_ms: 2000
	}
]

const config = document.querySelector("#config");
const exercise = document.getElementsByName("ex")[0];
const prev = document.getElementsByName("prev")[0];
const next = document.getElementsByName("next")[0];
const images = document.querySelector("#images");
const counter = document.querySelector("#counter");

window.idx = 0;
let interval;

function navigate(idx, start=true) {
	clearInterval(interval);
	if (0 > idx || idx >= ex.length)
		return;
	window.idx = idx;
	exercise.innerText = ex[idx].id + "/" + ex[ex.length-1].id;
	images.innerHTML = "";
	ex[idx].img.forEach(src => {
		const img = document.createElement("img");
		img.src = src;
		images.appendChild(img);
	});
	prev.disabled = idx == 0;
	next.disabled = idx == ex.length-1;
	start && restart();
}

function restart() {
	clearInterval(interval);
	count(
		["*3*", "*2*", "*1*", "GO"],
		1000,
		() => count(
			[...Array(ex[window.idx].reps_min + 1).keys()].reverse(),
			ex[window.idx].duration_ms,
			() => navigate(++window.idx)
		)
	);
}

function count(values, ms, cb) {
	counter.innerHTML = values[0];
	let idx = 1;
	const func = () => {
		if (idx >= values.length) {
			clearInterval(interval);
			cb && cb();
			return;
		}
		counter.innerHTML = values[idx];
		idx++;
	}
	interval = setInterval(func, ms);
}

navigate(0, false);
