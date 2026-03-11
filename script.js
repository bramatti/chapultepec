// 1. CONFIGURAÇÕES DA PLANILHA
const SHEET_ID = '1P0_6foBcvG8R9a_A47MdWAgJIK5uvRzjaz6vGHn8VeA'; // <-- Substitua pelo seu ID
const SHEET_NAME = 'países'; // Nome exato da aba onde estão os dados
const URL_GOOGLE_SHEETS = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

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

// 2. FUNÇÃO PARA BUSCAR OS DADOS NA PLANILHA
async function carregarDadosDaPlanilha() {
    try {
        tituloPregunta.textContent = "Cargando datos desde Google Sheets...";
        opcionesContainer.innerHTML = '';
        
        const response = await fetch(URL_GOOGLE_SHEETS);
        const text = await response.text();
        
        // O Google retorna um formato específico. Aqui extraímos apenas o JSON útil:
        const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const jsonData = JSON.parse(jsonString);

        // Transformamos as linhas da planilha no formato que o nosso quiz entende
        // Ignoramos a primeira linha caso ela seja o cabeçalho (País, Nivel de Libertad, etc)
        datos = jsonData.table.rows.map(row => {
            return {
                pais: row.c[0] ? row.c[0].v : "",
                nivel: row.c[1] ? row.c[1].v : "",
                evolucion: row.c[2] ? row.c[2].v : "",
                resumen: row.c[3] ? row.c[3].v : ""
            };
        }).filter(d => d.pais !== "" && d.pais !== "País"); // Filtra linhas vazias e o cabeçalho

        // Depois que os dados carregam, iniciamos o jogo
        tituloPregunta.textContent = "¿De qué país estamos hablando?";
        iniciarJuego();

    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        tituloPregunta.textContent = "Error al cargar los datos. Por favor, verifique si la planilla es pública.";
    }
}

// 3. LÓGICA DO QUIZ (Mesma de antes)
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
    let otrosPaises = datos.filter(d => d.pais !== preguntaActual.pais);
    
    for(let i=0; i<2; i++) {
        if(otrosPaises.length > 0) {
            const indexWrong = Math.floor(Math.random() * otrosPaises.length);
            opciones.push(otrosPaises[indexWrong].pais);
            otrosPaises.splice(indexWrong, 1);
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

    if (paisSeleccionado === preguntaActual.pais) {
        puntuacion++;
        boton.style.backgroundColor = '#27ae60'; 
        feedbackDiv.classList.add('correct');
        feedbackDiv.textContent = "¡Muy bien! Siga a la próxima pregunta y al final vea cuántos puntos logra alcanzar.";
    } else {
        boton.style.backgroundColor = '#c0392b'; 
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

// 4. INICIAR APLICATIVO BUSCANDO OS DADOS PRIMEIRO
carregarDadosDaPlanilha();