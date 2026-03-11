
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

// 2. FUNÇÃO ROBUSTA PARA LER O CSV (Lida com quebras de linha e vírgulas dentro do texto)
function lerCSV(strData) {
    const arr = [];
    let quote = false;
    for (let row = 0, col = 0, c = 0; c < strData.length; c++) {
        let cc = strData[c], nc = strData[c+1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';
        
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
        if (cc == '"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { ++col; continue; }
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }
        
        arr[row][col] += cc;
    }
    return arr;
}

// 3. BUSCAR DADOS DA PLANILHA EM FORMATO CSV
async function carregarDadosDaPlanilha() {
    try {
        tituloPregunta.textContent = "Cargando datos desde Google Sheets...";
        opcionesContainer.innerHTML = '';
        
        const response = await fetch(URL_CSV);
        if (!response.ok) throw new Error('Falha na resposta da rede');
        
        const text = await response.text();
        
        // Passa o texto bruto pela nossa nova função robusta
        const linhasTratadas = lerCSV(text);
        datos = [];

        // Começa do índice 1 para pular o cabeçalho (País, Nivel...)
        for (let i = 1; i < linhasTratadas.length; i++) {
            const colunas = linhasTratadas[i];
            
            // Verifica se a linha tem dados suficientes e não está vazia
            if (colunas.length >= 4 && colunas[0].trim() !== "") {
                datos.push({
                    pais: colunas[0].trim(),
                    nivel: colunas[1].trim(),
                    evolucion: colunas[2].trim(),
                    resumen: colunas[3].trim()
                });
            }
        }

        if (datos.length === 0) throw new Error('Nenhum dado válido encontrado');

        tituloPregunta.textContent = "¿De qué país estamos hablando?";
        iniciarJuego();

    } catch (error) {
        console.error("Erro ao carregar o CSV:", error);
        tituloPregunta.textContent = "Error al cargar los datos. Verifique el enlace de la planilla.";
    }
}

// 4. LÓGICA DO QUIZ
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

// 5. LÓGICA DO WHATSAPP
document.getElementById('btn-whatsapp').addEventListener('click', () => {
    const linkDoQuiz = window.location.href; 
    const textoMensagem = `¿Has visto las últimas noticias sobre la libertad de prensa en 23 países de América? He acertado ${puntuacion} de ${MAX_PREGUNTAS} preguntas sobre el tema y te reto a que también respondas al cuestionario. ${linkDoQuiz}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoMensagem)}`;
    window.open(urlWhatsApp, '_blank');
});

// 6. INICIAR
carregarDadosDaPlanilha();