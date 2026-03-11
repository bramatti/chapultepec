const datos = [
    { pais: "República Dominicana", nivel: "Con Libertad", evolucion: "Mejoró", resumen: "Es el único país con plena libertad de expresión en la región. Sin embargo, la prensa enfrenta fragilidad económica, el uso de la publicidad estatal para influir en los medios y la amenaza de nuevas leyes que podrían generar censura." },
    { pais: "Chile", nivel: "Baja Restricción", evolucion: "Empeoró", resumen: "Aunque no hay censura directa del Estado, la situación empeoró levemente. Las principales amenazas son la concentración económica de los medios, presiones judiciales a los periodistas y una creciente desconfianza ciudadana en las noticias." },
    { pais: "Canadá", nivel: "Baja Restricción", evolucion: "Empeoró", resumen: "Sigue siendo un país con libertades, pero ha mostrado un deterioro. Hay tensiones por nuevas leyes que buscan regular el espacio digital, lo que ha centralizado el discurso y presionado a las plataformas, sumado a un aumento en la inseguridad para los periodistas." },
    { pais: "Brasil", nivel: "Baja Restricción", evolucion: "Mejoró", resumen: "Superó años de hostilidad extrema y el tono del gobierno ha mejorado. Sus mayores problemas actuales son los 'desiertos de noticias' en zonas rurales (lugares sin medios locales) y la persistente inseguridad y amenazas sutiles contra periodistas." },
    { pais: "Uruguay", nivel: "Baja Restricción", evolucion: "Mejoró", resumen: "Aunque subió en el puntaje, el ejercicio periodístico se ha visto afectado por discursos negativos desde el poder, falta de transparencia y un aumento de demandas legales para silenciar a los comunicadores." },
    { pais: "Jamaica", nivel: "Baja Restricción", evolucion: "Mejoró", resumen: "Cuenta con instituciones fuertes, pero el gobierno intenta controlar la narrativa mediante la publicidad estatal. Preocupa la influencia de grupos criminales que imponen zonas de silencio y el uso de leyes de datos para evitar la transparencia." },
    { pais: "Panamá", nivel: "Baja Restricción", evolucion: "Mejoró", resumen: "Existe un clima de 'erosión silenciosa'. El gobierno usa la publicidad oficial para asfixiar económicamente a medios críticos, y hay constantes demandas millonarias y reformas de leyes para criminalizar a los periodistas." },
    { pais: "Argentina", nivel: "En Restricción", evolucion: "Mejoró", resumen: "Su mejora en la tabla se debe más a la caída de otros países. La situación está marcada por discursos del gobierno que estigmatizan a la prensa y acciones extremas como el cierre de medios estatales (como la agencia Télam)." },
    { pais: "Paraguay", nivel: "En Restricción", evolucion: "Empeoró", resumen: "Experimentó una caída importante en su puntaje, consolidándose como un entorno donde el ejercicio del periodismo enfrenta serias limitaciones para mantener informada a la ciudadanía de manera libre." },
    { pais: "Costa Rica", nivel: "En Restricción", evolucion: "Empeoró", resumen: "Bajó casi 5 puntos. El Poder Ejecutivo ejerce una influencia moderada en las situaciones que perjudican a la prensa, limitando cada vez más el entorno para los medios." },
    { pais: "Estados Unidos", nivel: "En Restricción", evolucion: "Empeoró", resumen: "Sufrió una caída drástica de más de 22 puntos y perdió su categoría de baja restricción. Esto se debió a un fuerte deterioro institucional y a la eliminación de protecciones históricas para el periodismo durante 2025." },
    { pais: "Colombia", nivel: "En Restricción", evolucion: "Mejoró", resumen: "Mostró un avance en su puntaje, pero la prensa sigue trabajando en un entorno peligroso. El principal problema de censura y violencia proviene de grupos armados irregulares (como el ELN) que amenazan a los periodistas." },
    { pais: "Guatemala", nivel: "En Restricción", evolucion: "Mejoró", resumen: "Logró un repunte de más de 11 puntos, saliendo de las posiciones más bajas. Aún así, el Poder Judicial mantiene una influencia negativa moderada, usando la justicia para complicar el trabajo de los medios." },
    { pais: "Ecuador", nivel: "Alta Restricción", evolucion: "Empeoró", resumen: "Sufrió una fuerte caída. Los periodistas están atrapados entre dos frentes: la violencia mortal del crimen organizado (que actúa con impunidad) y la represión y censura administrativa por parte del Estado." },
    { pais: "Bolivia", nivel: "Alta Restricción", evolucion: "Mejoró", resumen: "Subió algunos puntos, pero se mantiene en una situación muy restrictiva debido a una fuerte crisis económica que asfixia a los medios y un entorno estatal muy hostil hacia la prensa independiente." },
    { pais: "Honduras", nivel: "Alta Restricción", evolucion: "Empeoró", resumen: "Continúa en una situación crítica desde 2023. La libertad de expresión se ve fuertemente obstaculizada, con una clara influencia negativa impulsada por el Poder Ejecutivo." },
    { pais: "Perú", nivel: "Alta Restricción", evolucion: "Empeoró", resumen: "Sigue descendiendo en el ranking. Hay un cerco a las libertades informativas promovido principalmente desde el Poder Ejecutivo, lo que dificulta seriamente el derecho de los ciudadanos a estar informados." },
    { pais: "México", nivel: "Alta Restricción", evolucion: "Empeoró", resumen: "Es uno de los países más peligrosos del mundo para los periodistas. La violencia letal del crimen organizado cobra vidas año tras año, sumado a que los funcionarios públicos agreden y hostigan constantemente a la prensa." },
    { pais: "Haití", nivel: "Alta Restricción", evolucion: "Nueva inclusión", resumen: "Entró por primera vez al índice y se ubicó entre los peores del continente. Es un entorno sumamente hostil y peligroso para ejercer el periodismo debido a la crisis general y la falta de garantías del Estado." },
    { pais: "Cuba", nivel: "Alta Restricción", evolucion: "Mejoró", resumen: "Tuvo un leve repunte matemático, pero la situación real no ha cambiado. Sigue siendo un entorno de alta restricción donde el Estado controla todo y ejerce una influencia muy fuerte para evitar voces disidentes." },
    { pais: "El Salvador", nivel: "Alta Restricción", evolucion: "Empeoró", resumen: "Continúa su deterioro constante perdiendo 7 puntos más. El gobierno tiene un control muy estricto y la libertad de la prensa independiente es casi nula bajo la influencia fuerte del Ejecutivo." },
    { pais: "Nicaragua", nivel: "Sin Libertad", evolucion: "Empeoró", resumen: "Es zona roja absoluta. No existe ningún tipo de libertad de expresión; la persecución del Estado impide que los ciudadanos se informen o que el periodismo independiente pueda operar en el país." },
    { pais: "Venezuela", nivel: "Sin Libertad", evolucion: "Empeoró", resumen: "Ocupa el último y peor lugar del continente. Hay una 'mordaza estructurada' impulsada por todos los poderes del Estado: cerraron más de 400 emisoras de radio y las prácticas represivas y desinformativas anularon la libertad de prensa por completo." }
];

let preguntasRestantes = [...datos];
let preguntaActual = null;
let puntuacion = 0;
let totalPreguntasJugadas = 0;

const nivelText = document.getElementById('nivel-text');
const evolucionText = document.getElementById('evolucion-text');
const resumenText = document.getElementById('resumen-text');
const opcionesContainer = document.getElementById('opciones-container');
const feedbackDiv = document.getElementById('feedback');
const btnSiguiente = document.getElementById('btn-siguiente');
const quizArea = document.getElementById('quiz-area');
const resultadosArea = document.getElementById('resultados-area');

function iniciarJuego() {
    preguntasRestantes = [...datos];
    puntuacion = 0;
    totalPreguntasJugadas = 0;
    quizArea.classList.remove('hidden');
    resultadosArea.classList.add('hidden');
    cargarSiguientePregunta();
}

function cargarSiguientePregunta() {
    if (preguntasRestantes.length === 0) {
        mostrarResultados();
        return;
    }

    // Ocultar feedback y botón siguiente
    feedbackDiv.classList.add('hidden');
    feedbackDiv.className = 'feedback-mensaje hidden';
    btnSiguiente.classList.add('hidden');
    opcionesContainer.innerHTML = '';

    // Elegir pregunta aleatoria
    const indiceAleatorio = Math.floor(Math.random() * preguntasRestantes.length);
    preguntaActual = preguntasRestantes.splice(indiceAleatorio, 1)[0];
    
    // Mostrar datos
    nivelText.textContent = preguntaActual.nivel;
    evolucionText.textContent = preguntaActual.evolucion;
    resumenText.textContent = preguntaActual.resumen;

    // Generar opciones (1 correcta + 2 incorrectas)
    let opciones = [preguntaActual.pais];
    let otrosPaises = datos.filter(d => d.pais !== preguntaActual.pais);
    
    // Elegir 2 incorrectas aleatorias
    for(let i=0; i<2; i++) {
        const indexWrong = Math.floor(Math.random() * otrosPaises.length);
        opciones.push(otrosPaises[indexWrong].pais);
        otrosPaises.splice(indexWrong, 1);
    }

    // Mezclar las opciones (Shuffle)
    opciones = opciones.sort(() => Math.random() - 0.5);

    // Crear botones
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.textContent = opcion;
        btn.onclick = () => verificarRespuesta(opcion, btn);
        opcionesContainer.appendChild(btn);
    });
}

function verificarRespuesta(paisSeleccionado, boton) {
    // Deshabilitar todos los botones
    Array.from(opcionesContainer.children).forEach(btn => btn.disabled = true);
    
    totalPreguntasJugadas++;
    feedbackDiv.classList.remove('hidden');
    btnSiguiente.classList.remove('hidden');

    if (paisSeleccionado === preguntaActual.pais) {
        puntuacion++;
        boton.style.backgroundColor = '#27ae60'; // Verde
        feedbackDiv.classList.add('correct');
        feedbackDiv.textContent = "¡Muy bien! Siga a la próxima pregunta y al final vea cuántos puntos logra alcanzar.";
    } else {
        boton.style.backgroundColor = '#c0392b'; // Rojo
        // Buscar y pintar el correcto de verde
        Array.from(opcionesContainer.children).forEach(btn => {
            if(btn.textContent === preguntaActual.pais) btn.style.backgroundColor = '#27ae60';
        });
        feedbackDiv.classList.add('incorrect');
        feedbackDiv.textContent = `¡No! El país es ${preguntaActual.pais}. Siga a la próxima pregunta y al final vea cuántos puntos logra alcanzar.`;
    }
}

function mostrarResultados() {
    quizArea.classList.add('hidden');
    resultadosArea.classList.remove('hidden');
    document.getElementById('puntuacion').textContent = puntuacion;
    document.getElementById('total-preguntas').textContent = totalPreguntasJugadas;
}

btnSiguiente.addEventListener('click', cargarSiguientePregunta);
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJuego);

// Iniciar el quiz al cargar la página
iniciarJuego();