// common/script.js
document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL에 따라 JSON 파일 경로 설정
    const language = window.location.pathname.includes('/ko/') ? 'ko' : 'en';
    const jsonFile = language === 'ko' ? 'spaces_ko.json' : 'spaces_en.json';

    fetch(`../${language}/${jsonFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('cards-container');
            data.forEach(space => {
                const card = document.createElement('div');
                card.className = 'card';
                
                card.innerHTML = `
                    <img src="${space.thumbnail}" alt="${space.title}" class="thumbnail">
                    <h2>${space.title}</h2>
                    <p class="use">${space.use}</p>
                    <p class="description">${space.description}</p>
                    <div class="buttons">
                        <button class="copy-btn" data-scenid="${space.scenid}">ScenID 복사</button>
                        <button class="host-btn">Host 접속</button>
                        <button class="guest-btn">Guest 접속</button>
                    </div>
                `;
                
                container.appendChild(card);
            });
            
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const scenid = button.getAttribute('data-scenid');
                    navigator.clipboard.writeText(scenid).then(() => {
                        alert(`ScenID ${scenid} 복사됨`);
                    });
                });
            });

            document.querySelectorAll('.host-btn').forEach(button => {
                button.addEventListener('click', () => {
                    alert('Host로 접속');
                    // Host 접속 로직 추가
                });
            });

            document.querySelectorAll('.guest-btn').forEach(button => {
                button.addEventListener('click', () => {
                    alert('Guest로 접속');
                    // Guest 접속 로직 추가
                });
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
