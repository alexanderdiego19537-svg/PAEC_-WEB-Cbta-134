/**
 * =====================================================
 * PAEC - PROGRAMA AULA-ESCUELA-COMUNIDAD
 * ARCHIVO: script.js
 * DESCRIPCIÓN: Script principal para la funcionalidad
 *              interactiva del sitio web PAEC CBTa 134
 
 * =====================================================
 */

// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // SECCIÓN 1: CORRECCIÓN DE VISIBILIDAD (SEGURIDAD)
    // =====================================================
    // Esta función se ejecuta después de 500 milisegundos
    // para asegurar que todos los elementos con animación
    // se muestren correctamente, incluso si el observador falla
    setTimeout(() => {
        // Busca todos los elementos con clase 'fade-in' que no tengan 'visible'
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            // Agrega la clase 'visible' para mostrar el elemento
            el.classList.add('visible');
            // Asegura que la opacidad sea 1 (completamente visible)
            el.style.opacity = '1';
        });
    }, 500); // 500ms = medio segundo de espera

    // =====================================================
    // SECCIÓN 2: OBSERVADOR DE INTERSECCIÓN
    // =====================================================
    // El Observador de Intersección detecta cuándo un elemento
    // entra en la pantalla visible del usuario, permitiendo
    // activar animaciones de entrada suaves

    // Configuración del observador
    const observerOptions = {
        root: null,           // Usa la ventana del navegador como referencia
        rootMargin: '0px',    // Sin margen adicional
        threshold: 0          // Se activa cuando cualquier parte del elemento es visible
    };

    // Crear el observador con una función de callback
    const observer = new IntersectionObserver((entries, observer) => {
        // Recorre cada elemento observado
        entries.forEach(entry => {
            // Si el elemento está visible en la pantalla
            if (entry.isIntersecting) {
                // Agrega la clase 'visible' para activar la animación CSS
                entry.target.classList.add('visible');
                // Deja de observar el elemento (ya no necesitamos detectarlo)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Buscar todos los elementos con clases de animación
    const fadeElements = document.querySelectorAll('.fade-in, .animate-up, .slide-left');
    // Observar cada uno de estos elementos
    fadeElements.forEach(el => observer.observe(el));

    // =====================================================
    // SECCIÓN 3: NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
    // =====================================================
    // Esta sección controla el menú de navegación en dispositivos móviles
    // El "hamburger" es el icono de tres líneas que abre el menú

    // Obtener el botón hamburguesa y el contenedor de navegación
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    // Verificar que ambos elementos existan en la página
    if (hamburger && nav) {

        // Al hacer clic en el botón hamburguesa, mostrar/ocultar el menú
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active'); // Anima el icono hamburguesa
            nav.classList.toggle('active');       // Muestra/oculta el menú
        });

        // Obtener todos los enlaces dentro del menú de navegación
        const navLinks = nav.querySelectorAll('a');

        // Al hacer clic en cualquier enlace, cerrar el menú
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active'); // Cierra el icono hamburguesa
                nav.classList.remove('active');       // Oculta el menú
            });
        });

        // Cerrar el menú si el usuario hace clic fuera de él
        document.addEventListener('click', (e) => {
            // Si el clic no fue en el hamburguesa ni en el nav
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active'); // Cierra el icono
                nav.classList.remove('active');       // Oculta el menú
            }
        });
    }

    // =====================================================
    // SECCIÓN 4: ENCABEZADO FIJO AL HACER SCROLL
    // =====================================================
    // Esta sección cambia el estilo del encabezado cuando
    // el usuario hace scroll hacia abajo en la página

    // Obtener el elemento del encabezado
    const header = document.querySelector('.header');

    // Verificar que el encabezado exista
    if (header) {
        // Escuchar el evento de scroll en la ventana
        window.addEventListener('scroll', () => {
            // Si el usuario ha bajado más de 50 píxeles
            if (window.scrollY > 50) {
                // Agregar la clase 'scrolled' para cambiar el estilo
                header.classList.add('scrolled');
            } else {
                // Si está arriba, quitar la clase 'scrolled'
                header.classList.remove('scrolled');
            }
        });
    }

}); // Fin del evento DOMContentLoaded
