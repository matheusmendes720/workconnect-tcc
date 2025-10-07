// --- Funcionalidade do FAQ (Acordeão) ---
const faqPerguntas = document.querySelectorAll('.faq-pergunta');

faqPerguntas.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const resposta = pergunta.nextElementSibling;
        
        pergunta.classList.toggle('active');

        if (pergunta.classList.contains('active')) {
            resposta.style.maxHeight = resposta.scrollHeight + 'px';
        } else {
            resposta.style.maxHeight = '0px';
        }
    });
});

// --- Rolagem Suave para links de navegação ---
// (Já é feito nativamente com scroll-behavior: smooth no CSS,
// mas este JS é uma alternativa mais robusta se necessário)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

