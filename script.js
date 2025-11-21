document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('surveyForm');

	form.addEventListener('submit', e => {
		e.preventDefault();

		const totalQuestions = 30;
		const results = { T: 0, A: 0, C: 0, E: 0 };

		for (let i = 1; i <= totalQuestions; i++) {
			const selected = form.querySelector(`input[name="rd-${i}"]:checked`);

			if (!selected) {
				showError('გთხოვთ, მონიშნოთ ყველა 30 შეკითხვა!');
				return;
			}

			const marker = selected.dataset.marker;
			if (results[marker] !== undefined) {
				results[marker]++;
			}
		}

		showResults(results);
	});
});

function showError(msg) {
	let box = document.querySelector('.message-box');

	if (!box) {
		box = document.createElement('div');
		box.className = 'message-box';
		document.body.appendChild(box);
	}

	box.innerHTML = msg;
	box.style.display = 'block';

	setTimeout(() => {
		box.style.display = 'none';
	}, 2500);
}

function showResults(results) {
	let box = document.querySelector('.result-box');

	if (!box) {
		box = document.createElement('div');
		box.className = 'result-box';
		document.body.appendChild(box);
	}

	// Определяем, у кого больше в парах
	let TAmax = results.T >= results.A ? 'T' : 'A';
	let CEmax = results.C >= results.E ? 'C' : 'E';

	box.innerHTML = `
		<h2>შენი შედეგები</h2>

		<div class="group">
			<p class="blue">
				<strong>T:</strong> <span class="value ${TAmax === 'T' ? 'highlight' : ''}">${results.T}</span>
			</p>
			<p class="blue">
				<strong>A:</strong> <span class="value ${TAmax === 'A' ? 'highlight' : ''}">${results.A}</span>
			</p>
		</div>

		<div style="height:15px;"></div>

		<div class="group">
			<p class="green">
				<strong>C:</strong> <span class="value ${CEmax === 'C' ? 'highlight' : ''}">${results.C}</span>
			</p>
			<p class="green">
				<strong>E:</strong> <span class="value ${CEmax === 'E' ? 'highlight' : ''}">${results.E}</span>
			</p>
		</div>

		<button class="close-result">დახურვა</button>
	`;

	box.style.display = 'block';

	document.querySelector('.close-result').addEventListener('click', () => {
		box.style.display = 'none';
	});
}
