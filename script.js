https://docs.google.com/spreadsheets/d/e/2PACX-1vTwRT6eTI5Ahw5bf1W0jbS6gMgS3fg5dPgmKIPMhGZ1fQugK4mfMbpsxfhQcEYvojOQHBgOda6qgLG4/pub?gid=0&single=true&output=csv

// 1. COLE O SEU LINK CSV AQUI DENTRO DAS ASPAS
const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwRT6eTI5Ahw5bf1W0jbS6gMgS3fg5dPgmKIPMhGZ1fQugK4mfMbpsxfhQcEYvojOQHBgOda6qgLG4/pub?gid=0&single=true&output=csv'; 

const MAX_PREGUNTAS = 10; 

let datos = [];
let preguntasRestantes = [];
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
const tituloPregunta = document.querySelector('.pregunta');

// 2. BUSCAR DADOS DA PLANILHA EM FORMATO CSV
async function carregarDadosDaPlanilha() {
    try {
        tituloPregunta.textContent = "Cargando datos desde Google Sheets...";
        opcionesContainer.innerHTML = '';
        
        const response = await fetch(URL_CSV);
        if (!response.ok) throw new Error('Falha na resposta da rede');
        
        const text = await response.text();
        
        // Separa o texto em linhas
        const linhas = text.split('\n');
        datos = [];

        // Ignora a primeira linha (cabeçalho) e percorre o resto
        for (let i = 1; i < linhas.length; i++) {
            if (!linhas[i].trim()) continue; // Pula linhas vazias
            
            // Separa por vírgulas, mas ignora as vírgulas que estão dentro de aspas (textos longos)
            const colunas = linhas[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(item => {
                // Remove aspas no começo e fim que o Google coloca em textos com vírgulas
                return item.replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            });

            // Se a linha tem dados válidos, adiciona ao nosso banco do jogo
            if (colunas.length >= 4 && colunas[0] !== "") {
                datos.push({
                    pais: colunas[0],
                    nivel: colunas[1],
                    evolucion: colunas[2],
                    resumen: colunas[3]
                });
            }
        }

        if (datos.length === 0) throw new Error('Nenhum dado encontrado');

        tituloPregunta.textContent = "¿De qué país estamos hablando?";
        iniciarJuego();

    } catch (error) {
        console.error("Erro ao carregar o CSV:", error);
        tituloPregunta.textContent = "Error al cargar los datos. Verifique el enlace de la planilla.";
    }
}

// 3. LÓGICA DO QUIZ
function iniciarJuego() {
    preguntasRestantes = [...datos];
    puntuacion = 0;
    totalPreguntasJugadas = 0;
    quizArea.classList.remove('hidden');
    resultadosArea.classList.add('hidden');
    cargarSiguientePregunta();
}

function cargarSiguientePregunta() {
    if (totalPreguntasJugadas >= MAX_PREGUNTAS || preguntasRestantes.length === 0) {
        mostrarResultados();
        return;
    }

    feedbackDiv.classList.add('hidden');
    feedbackDiv.className = 'feedback-mensaje hidden';
    btnSiguiente.classList.add('hidden');
    opcionesContainer.innerHTML = '';

    const indiceAleatorio = Math.floor(Math.random() * preguntasRestantes.length);
    preguntaActual = preguntasRestantes.splice(indiceAleatorio, 1)[0];
    
    nivelText.textContent = preguntaActual.nivel;
    evolucionText.textContent = preguntaActual.evolucion;
    resumenText.textContent = preguntaActual.resumen;

    let opciones = [preguntaActual.pais];
    let posiblesIncorrectas = [...preguntasRestantes]; 
    
    for(let i = 0; i < 2; i++) {
        if(posiblesIncorrectas.length > 0) {
            const indexWrong = Math.floor(Math.random() * posiblesIncorrectas.length);
            opciones.push(posiblesIncorrectas[indexWrong].pais);
            posiblesIncorrectas.splice(indexWrong, 1);
        }
    }

    opciones = opciones.sort(() => Math.random() - 0.5);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.textContent = opcion;
        btn.onclick = () => verificarRespuesta(opcion, btn);
        opcionesContainer.appendChild(btn);
    });
}

function verificarRespuesta(paisSeleccionado, boton) {
    Array.from(opcionesContainer.children).forEach(btn => btn.disabled = true);
    
    totalPreguntasJugadas++;
    feedbackDiv.classList.remove('hidden');
    btnSiguiente.classList.remove('hidden');

    let textoFeedbackSiguiente = "";

    if (totalPreguntasJugadas < MAX_PREGUNTAS) {
        btnSiguiente.textContent = `Próxima pregunta (${totalPreguntasJugadas + 1} de ${MAX_PREGUNTAS})`;
        textoFeedbackSiguiente = "Siga a la próxima pregunta y al final vea cuántos puntos logra alcanzar.";
    } else {
        btnSiguiente.textContent = "Ver resultados";
        textoFeedbackSiguiente = "¡Ha terminado! Haga clic abajo para ver sus resultados.";
    }

    if (paisSeleccionado === preguntaActual.pais) {
        puntuacion++;
        boton.style.backgroundColor = '#27ae60'; 
        feedbackDiv.classList.add('correct');
        feedbackDiv.textContent = `¡Muy bien! ${textoFeedbackSiguiente}`;
    } else {
        boton.style.backgroundColor = '#c0392b'; 
        Array.from(opcionesContainer.children).forEach(btn => {
            if(btn.textContent === preguntaActual.pais) btn.style.backgroundColor = '#27ae60';
        });
        feedbackDiv.classList.add('incorrect');
        feedbackDiv.textContent = `¡No! El país es ${preguntaActual.pais}. ${textoFeedbackSiguiente}`;
    }
}

function mostrarResultados() {
    quizArea.classList.add('hidden');
    resultadosArea.classList.remove('hidden');
    document.getElementById('puntuacion').textContent = puntuacion;
    document.getElementById('total-preguntas').textContent = MAX_PREGUNTAS;
}

btnSiguiente.addEventListener('click', cargarSiguientePregunta);
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJuego);

// 4. LÓGICA DO WHATSAPP
document.getElementById('btn-whatsapp').addEventListener('click', () => {
    const linkDoQuiz = window.location.href; 
    const textoMensagem = `¿Has visto las últimas noticias sobre la libertad de prensa en 23 países de América? He acertado ${puntuacion} de ${MAX_PREGUNTAS} preguntas sobre el tema y te reto a que también respondas al cuestionario. ${linkDoQuiz}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoMensagem)}`;
    window.open(urlWhatsApp, '_blank');
});

// 5. INICIAR
carregarDadosDaPlanilha();