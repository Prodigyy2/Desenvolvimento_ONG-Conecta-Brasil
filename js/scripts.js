// Função global para fechar o modal, usada pelo botão "Entendido"
const closeDemoModal = () => {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.classList.remove('is-visible');
        // Dá tempo para a transição do CSS antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); 
    }
};

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------------------------------------
    // 1. Lógica do Formulário de Doação (Página como-ajudar.html)
    // ---------------------------------------------
    const outroValorRadio = document.getElementById('outro-valor-radio');
    const outroValorInput = document.getElementById('outro-valor-input');

    if (outroValorRadio && outroValorInput) {
        outroValorInput.disabled = true;

        const toggleOutroValor = () => {
            outroValorInput.disabled = !outroValorRadio.checked;
            if (!outroValorRadio.checked) {
                outroValorInput.value = ''; 
            } else {
                outroValorInput.focus(); 
            }
        };

        document.querySelectorAll('input[name="valor_doacao"]').forEach(radio => {
            radio.addEventListener('change', toggleOutroValor);
        });

        toggleOutroValor();
    }


    // ---------------------------------------------
    // 2. Menu Sticky (Cabeçalho fixo)
    // ---------------------------------------------
    const header = document.querySelector('header');
    
    if (header) {
        const headerClone = header.cloneNode(true); 
        headerClone.classList.add('sticky');
        document.body.prepend(headerClone);
        
        // Esconde o header fixo inicialmente
        headerClone.style.display = 'none';

        const handleStickyHeader = () => {
            // Se o usuário rolou mais de 100px
            if (window.pageYOffset > 100) { 
                headerClone.style.display = 'flex'; 
            } else {
                headerClone.style.display = 'none'; 
            }
        };

        window.addEventListener('scroll', handleStickyHeader);
        handleStickyHeader();
    }


    // ---------------------------------------------
    // 3. Efeito Scroll Reveal (Revelar ao rolar)
    // ---------------------------------------------
    const revealElements = document.querySelectorAll('.container h2, .container p, .container .project-details, .container ul, .container form, .container img, .container footer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 
    });

    revealElements.forEach(element => {
        if (!element.classList.contains('slogan')) {
            element.classList.add('scroll-hidden');
            observer.observe(element);
        }
    });

    // ---------------------------------------------
    // 4. Lógica de Modal de Demonstração (Para todos os formulários e links)
    // ---------------------------------------------
    const showDemoModal = (event) => {
        // 1. Impede o comportamento padrão (envio de form ou clique em link)
        event.preventDefault(); 
        
        const modal = document.getElementById('demo-modal');
        if (modal) {
            modal.style.display = 'block';
            
            // Exibe o modal após uma pequena pausa para animação
            setTimeout(() => {
                modal.classList.add('is-visible');
            }, 10); 
        }
    };

    // Função que aplica o listener a todos os formulários E LINKS DE TRANSPARÊNCIA
    const setupDemoModals = () => {
        const forms = document.querySelectorAll('form'); 

        forms.forEach(form => {
            // Intercepta o SUBMIT de todos os formulários
            form.addEventListener('submit', showDemoModal);
        });

        // ==========================================================
        // TRECHO INCLUÍDO: Intercepta o CLICK nos links de Transparência
        // ==========================================================
        const transparencyLinks = document.querySelectorAll('#transparencia a');
        transparencyLinks.forEach(link => {
            link.addEventListener('click', showDemoModal);
        });
        // ==========================================================

        // Adiciona listener para fechar o modal
        const closeButton = document.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeDemoModal);
        }
    };

    setupDemoModals();
});