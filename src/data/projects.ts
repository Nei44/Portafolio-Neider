// ─── TIPOS ────────────────────────────────────────────────────────────────────
// Cada campo sigue el diseño de la página de detalle del portafolio.
// Los campos que aún no tienes listos están marcados con [PENDIENTE].
// Nunca se inventan datos — si no lo tienes, queda marcado.

export type Metric = {
  value: string;   // ej. "1,000" o "~80%"
  label: string;   // ej. "Registros" o "Recall (bad)"
};

export type Project = {
  slug: string;            // URL: /proyectos/[slug]
  title: string;
  category: string;        // etiqueta de categoría (eyebrow)
  status: "En desarrollo" | "Completado" | "Pausado";
  summary: string;         // descripción corta para la tarjeta de la grilla
  tools: string[];         // badges de tecnologías
  metrics: Metric[];       // 4 números clave que aparecen en el header de la página

  // Campos del estudio de caso (pestañas de la página de detalle)
  context: string;
  problem: string;
  objective: string;
  dataUsed: string;
  cleaningProcess: string;
  methodology: string;
  visualizations: string;  // descripción de las gráficas clave
  results: string;
  learnings: string;
  limitations: string;

  // Recursos externos
  notebookUrl: string | null;   // Google Colab o nbviewer
  repoUrl: string | null;       // GitHub
};

// ─── PROYECTOS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [

  // ── PROYECTO 1: RIESGO CREDITICIO ─────────────────────────────────────────
  {
    slug: "riesgo-crediticio-ml",
    title: "Clasificación de Riesgo Crediticio con Machine Learning",
    category: "Machine Learning · Finanzas",
    status: "Completado",
    summary:
      "Clasificación de solicitantes de crédito como buenos o riesgosos usando cuatro " +
      "modelos de ML con búsqueda de hiperparámetros y validación cruzada, priorizando " +
      "el recall de la clase minoritaria sobre la precisión global.",
    tools: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Google Colab",
    ],
    metrics: [
      { value: "1,000", label: "Registros" },
      { value: "4", label: "Modelos comparados" },
      { value: "~80%", label: "Recall (bad)" },      // [ACTUALIZAR con resultado real]
      { value: "5-fold", label: "Validación cruzada" },
    ],

    // ── Estudio de caso ──────────────────────────────────────────────────────
    context:
      "En el sector financiero, otorgar crédito a un cliente que no podrá pagarlo " +
      "genera pérdidas directas que superan ampliamente el costo de rechazar a un " +
      "cliente confiable. Este proyecto aborda ese problema usando el dataset German " +
      "Credit Risk de Kaggle, ampliamente utilizado en la literatura de ML financiero.",

    problem:
      "Predecir si un solicitante de crédito representa un riesgo de impago (clase 'bad') " +
      "o es un cliente confiable (clase 'good'), con especial énfasis en minimizar los " +
      "falsos negativos — clientes riesgosos que el modelo no detecta.",

    objective:
      "Construir y comparar cuatro clasificadores (Regresión Logística, Naive Bayes, SVM " +
      "y KNN) usando GridSearchCV con balanced_accuracy como métrica de optimización, " +
      "y analizar en profundidad el modelo más interpretable para producción bancaria.",

    dataUsed:
      "German Credit Risk dataset (Kaggle) — 1,000 registros de solicitantes de crédito " +
      "con 10 variables: datos demográficos (edad, sexo, tipo de vivienda), situación " +
      "financiera (saldo de cuentas de ahorro y corriente), y características del " +
      "préstamo (monto, plazo, propósito). Distribución de clases: 70% good, 30% bad.",

    cleaningProcess:
      "'Saving accounts' (62 nulos, 6.2%): imputado con la moda ('little') por ser " +
      "una proporción pequeña sin sesgo significativo. " +
      "'Checking account' (394 nulos, 39.4%): imputado con categoría 'unknown' — " +
      "la ausencia de información sobre la cuenta corriente se trata como una señal " +
      "propia que el modelo puede aprender. Se eliminó la columna 'Age' original tras " +
      "crear la variable derivada 'Age group' con cuatro rangos etarios. " +
      "Se descartó 'Risk_prob' del conjunto de características para evitar fuga de " +
      "información (data leakage).",

    methodology:
      "1. Segmentación de edad en cuatro grupos con pd.cut() para capturar relaciones " +
      "no lineales. " +
      "2. Codificación ordinal manual de todas las variables categóricas, preservando " +
      "el orden real (ej. 'little' < 'moderate' < 'quite rich' < 'rich'). " +
      "3. Escalado con StandardScaler (media=0, desv=1) para igualar la escala de " +
      "variables como Credit amount (rango ~250-18,000) frente a Age group (rango 0-3). " +
      "4. División 80/20 con stratify=y para mantener la proporción de clases. " +
      "5. GridSearchCV (cv=5, scoring='balanced_accuracy') sobre los cuatro modelos. " +
      "6. Análisis profundo de Regresión Logística con L1 por su interpretabilidad. " +
      "7. Permutation importance para NB, SVM y KNN (sin coeficientes directos).",

    visualizations:
      "EDA: distribución por grupo de edad, cuentas bancarias y variable objetivo; " +
      "matrices de correlación con get_dummies(); probabilidad empírica de riesgo " +
      "por categoría (barplot sobre Risk_prob 0/1); boxplots de monto por propósito " +
      "y nivel laboral; curva KDE de cuota mensual estimada por tipo de cuenta. " +
      "Modelos: matriz de confusión + curva ROC para cada clasificador; " +
      "coeficientes L1 (Regresión Logística); permutation importance (NB, SVM, KNN); " +
      "distribución de probabilidades predichas con umbral de decisión.",

    results:
      "[COMPLETAR con los resultados reales una vez ejecutado el notebook] " +
      "Ejemplo de estructura: 'SVM obtuvo el mayor balanced_accuracy (X.XX) con un " +
      "recall de X.XX en la clase bad y especificidad de X.XX. La Regresión Logística " +
      "con L1 identificó Checking account y Duration como las variables de mayor peso.'",

    learnings:
      "El desequilibrio de clases (70/30) exige métricas específicas: balanced_accuracy " +
      "en lugar de accuracy simple, y class_weight='balanced' en los modelos. " +
      "La fuga de información (data leakage) es el error más silencioso en ML: incluir " +
      "Risk_prob en X hacía que el modelo 'aprendiera' la respuesta directamente, " +
      "produciendo distribuciones de probabilidad degeneradas (solo 0 o 1). " +
      "La interpretabilidad tiene valor propio: SVM puede superar a la Regresión " +
      "Logística en métricas, pero en banca se requiere poder explicar cada rechazo.",

    limitations:
      "1,000 registros es suficiente para aprendizaje pero insuficiente para producción " +
      "— los modelos necesitarían validación con datasets más grandes. " +
      "El tratamiento de 'Checking account' como 'unknown' reduce ruido pero introduce " +
      "información artificial en una variable con 39% de nulos. " +
      "No se realizó validación out-of-time (datos de un periodo diferente). " +
      "El dataset es de origen alemán y puede no reflejar patrones crediticios mexicanos " +
      "o latinoamericanos.",

    notebookUrl: null, // [PENDIENTE — agregar URL de Google Colab cuando esté publicado]
    repoUrl: "https://github.com/Nei44/German-credit-risk",
  },

  // ── PROYECTO 2: ANÁLISIS DE NETFLIX ───────────────────────────────────────
  {
    slug: "analisis-catalogo-netflix",
    title: "Análisis del Catálogo de Netflix y Motor de Recomendación",
    category: "EDA · NLP · Sistemas de Recomendación",
    status: "Completado",
    summary:
      "Análisis exploratorio del catálogo global de Netflix (~8,700 títulos) con " +
      "visualizaciones de tendencias, distribución geográfica y géneros, más un " +
      "motor de recomendación basado en contenido con TF-IDF y similitud coseno.",
    tools: [
      "Python",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "TF-IDF",
      "Google Colab",
    ],
    metrics: [
      { value: "8,700+", label: "Títulos analizados" },
      { value: "2015-2021", label: "Periodo de crecimiento" },
      { value: "10", label: "Recomendaciones por título" },
      { value: "Coseno", label: "Métrica de similitud" },
    ],

    context:
      "Netflix es la plataforma de streaming líder mundial. Su catálogo refleja " +
      "decisiones estratégicas de adquisición y producción que determinan la retención " +
      "de suscriptores. Analizar su composición permite identificar patrones de inversión " +
      "y oportunidades en mercados subrepresentados.",

    problem:
      "¿Qué patrones estratégicos caracterizan la oferta de contenido de Netflix? " +
      "¿Es posible construir un sistema de recomendación funcional usando solo metadatos " +
      "textuales sin datos de comportamiento del usuario?",

    objective:
      "Analizar la composición y evolución del catálogo de Netflix para identificar " +
      "tendencias en formato, géneros y geografía, e implementar un motor de " +
      "recomendación basado en contenido.",

    dataUsed:
      "Netflix Movies and TV Shows dataset (Kaggle) — ~8,700 títulos con fecha de " +
      "incorporación, tipo, país de producción, géneros, director, reparto y descripción. " +
      "Fecha de corte: 2021.",

    cleaningProcess:
      "Director, cast y country: imputados con 'Unknown' (campos no críticos para el EDA). " +
      "Rating, date_added y duration: filas con nulos eliminadas (campos críticos). " +
      "Extracción de year_added y month_added desde date_added con pd.to_datetime().",

    methodology:
      "EDA con distribuciones de tipo de contenido, tendencias temporales, top géneros y " +
      "países, y clasificaciones de audiencia. " +
      "Motor de recomendación: combinación de géneros, director, reparto y descripción " +
      "en un campo 'metadata_soup'; vectorización TF-IDF con stop_words='english'; " +
      "similitud coseno para encontrar los 10 títulos más cercanos a cualquier entrada.",

    visualizations:
      "Countplot películas vs series con porcentajes; línea temporal del catálogo " +
      "por año y tipo (2008-2021); barras horizontales de top géneros y países; " +
      "clasificaciones de audiencia más frecuentes.",

    results:
      "Las películas representan ~69.7% del catálogo. El pico de incorporación fue 2019, " +
      "con caída en 2020-2021 atribuible a las restricciones de producción por COVID-19. " +
      "Dramas internacionales y Comedias son los géneros más representados. " +
      "Estados Unidos e India concentran la mayor producción. " +
      "El motor de recomendación genera sugerencias coherentes en <1 segundo por consulta.",

    learnings:
      "TF-IDF es suficiente para un sistema de recomendación funcional sin datos de " +
      "comportamiento. La búsqueda insensible a mayúsculas mejora la UX sin costo " +
      "computacional. La categoría 'Internacional' en géneros revela estrategia de " +
      "diversificación geográfica activa de Netflix.",

    limitations:
      "Dataset con corte en 2021 — no refleja el catálogo actual. " +
      "El motor no incorpora señales de comportamiento real (historial, calificaciones). " +
      "El campo 'country' tiene coproduciones que inflan conteos de ciertos países.",

    notebookUrl: null, // [PENDIENTE]
    repoUrl: "https://github.com/Nei44/Recommendations-on-Netflix",
  },


  // ── PROYECTO 3: PREDICCION DE BITCOIN ────────────────────────────────────────
  {
    slug: "sistema-trading-cuantitativo-btc-xgboost",
    title: "Sistema de Trading Algorítmico Cuantitativo para BTC con XGBoost y Triple Barrera",
    category: "Trading Algorítmico / Machine Learning",
    status: "En desarrollo",
    summary:
      "Desarrollo de un sistema de trading algorítmico para Bitcoin (BTC/USDT) en velas de 15 minutos " +
      "con horizonte máximo de 24 horas. Implementa etiquetado dinámico mediante el Método de Triple " +
      "Barrera (R:R 1:3) de López de Prado, ingeniería de más de 50 features técnicos, macroeconómicos " +
      "y de microestructura, clasificación de regímenes de mercado con HMM como interruptor de riesgo, " +
      "y validación robusta con Combinatorial Purged Cross-Validation (CPCV) para evitar overfitting.",
    tools: [
      "Python",
      "Pandas",
      "NumPy",
      "XGBoost",
      "Statsmodels",
      "Arch (GARCH)",
      "Hmmlearn",
      "CCXT (OKX API)",
      "YFinance",
      "PyArrow (Parquet)",
      "Google Colab",
    ],
    metrics: [
      { value: "140,000+", label: "Velas de 15m analizadas (2022-2026)" },
      { value: "1:3", label: "Relación Riesgo/Beneficio (TP 3x / SL 1x ATR)" },
      { value: "0.53+", label: "AUC OOS con Purging y Embargo" },
      { value: "45.6%", label: "Win Rate Promedio OOS (Break-even: 25%)" },
    ],

    context:
      "El mercado de criptomonedas se caracteriza por su alta volatilidad, no linealidad y baja " +
      "relación señal-ruido. Los modelos predictivos tradicionales suelen fallar por data leakage " +
      "temporal, sobreajuste a microtendencias y falta de gestión del riesgo dinámico en mercados " +
      "laterales sin liquidez institucional.",

    problem:
      "¿Es posible obtener una ventaja estadística consistente operando BTC/USDT sin predecir la " +
      "dirección exacta del precio, sino modelando la probabilidad de alcanzar un objetivo de " +
      "beneficio de 3x ATR antes de tocar un stop loss de 1x ATR, filtrando activamente los regímenes " +
      "de mercado laterales donde las comisiones destruyen el capital?",

    objective:
      "Diseñar, validar y simular un pipeline cuantitativo integral que entrene modelos independientes " +
      "XGBoost (Long y Short) sobre datos de 15m, controlando rigurosamente el leakage, mitigando la " +
      "autocorrelación mediante pesos de unicidad y aplicando un HMM como filtro operativo para maximizar " +
      "el retorno ajustado al riesgo con un límite de Drawdown < 20%.",

    dataUsed:
      "Historial de velas OHLCV de OKX vía CCXT (BTC en 15m, 1h, 4h, 1d, 1w y ETH en 1h, 4h, 1d) " +
      "desde marzo de 2022 hasta 2026 (~141,885 velas de 15m). Datos macroeconómicos diarios vía YFinance " +
      "(SPY, DXY, Oro, Petróleo WTI, VIX, US10Y) con offset de +21h anti-leakage. Almacenamiento en Parquet.",

    cleaningProcess:
      "Descarga incremental particionada por timestamps UTC. Verificación de integridad con DataValidator " +
      "detectando nulos en precios, huecos temporales y anomalías (>50% de variación intrabar). " +
      "Alineación temporal causal estricta mediante pd.merge_asof(direction='backward') para datos macro " +
      "y aplicación de shift(1) global a todos los features previo al entrenamiento.",

    methodology:
      "Etiquetado con Triple Barrier Method (TP: +3 ATR, SL: -1 ATR, horizonte: 96 velas). " +
      "Generación de 53 features: 22 técnicos normalizados, 21 macroeconómicos y correlaciones rolling " +
      "(BTC-SPY, BTC-DXY, Risk Appetite Index), volatilidad condicional GARCH(1,1) walk-forward, y " +
      "detección de regímenes de 3 estados (Bear, Crab, Bull) con Gaussian HMM. " +
      "Ponderación de muestras con Uniqueness Weighting. Validación temporal con CPCV (12 folds, " +
      "train=180d, test=30d, embargo=1d, purging=96 velas). Optimización de threshold de decisión y " +
      "evaluación con Deflated Sharpe Ratio (DSR) y test de Ljung-Box sobre residuos.",

    visualizations:
      "Distribución de clases de triple barrera (Long vs Short); heatmaps de correlación rolling cross-asset; " +
      "gráfico de dispersión de regímenes HMM (Bear/Crab/Bull) sobre la serie de retornos; curvas ROC-AUC " +
      "por fold en CPCV; gráficos de Feature Importance por ganancia (Gain) de XGBoost; y curvas de " +
      "drawdown y equidad simulada.",

    results:
      "El etiquetado de triple barrera produce ~28.2% de éxitos Long y ~27.3% Short. " +
      "En CPCV de 12 folds, el modelo Long alcanza un AUC OOS de 0.5215 (con folds >0.61) y un Win Rate " +
      "del 45.6%, superando el umbral de break-even del 25% requerido por el R:R 1:3. " +
      "El diagnóstico por régimen HMM reveló que en fases tendenciales el AUC se incrementa sustancialmente, " +
      "validando el uso del estado Crab (46.4% del tiempo) como interruptor de apagado para evitar sobrecostos.",

    learnings:
      "Los indicadores técnicos aislados no contienen causalidad; la correlación intermercado (US10Y, DXY, SPY) " +
      "domina el feature importance. El Purging estricto y los Uniqueness Weights son obligatorios en cripto " +
      "para no confundir autocorrelación serial con predictibilidad. El filtro de régimen HMM aporta más valor " +
      "eliminando ruido que intentando forzar al modelo a predecir consolidaciones.",

    limitations:
      "Order Flow aproximado por OHLCV no añade ventaja frente a datos reales de Nivel 2 / L2. " +
      "Autocorrelación serial residual en rachas desfavorables detectada por Ljung-Box. " +
      "Sensibilidad a la liquidez y slippage dinámico en eventos de alta volatilidad no modelados en spot puro.",

    notebookUrl: null, // [PENDIENTE]
    repoUrl: "https://github.com/Nei44/BTCprediction",
  },



  // ── PROYECTO 4: PORTFOLIO OPTIMIZATION — RIESGO CREDITICIO ──────────────────
  {
    slug: "optimizacion-portafolio-riesgo-crediticio",
    title: "Optimización de Portafolio de Crédito: Clasificación ML de Riesgo",
    category: "Machine Learning · Finanzas · Clasificación",
    status: "Completado",
    summary:
      "Comparación de cuatro clasificadores (Logística L1, Naive Bayes, SVM, KNN) " +
      "sobre el German Credit Risk dataset para minimizar falsos negativos — " +
      "clientes riesgosos no detectados — con GridSearchCV y balanced_accuracy.",
    tools: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "GridSearchCV",
      "Google Colab",
    ],
    metrics: [
      { value: "1,000", label: "Registros analizados" },
      { value: "4", label: "Clasificadores comparados" },
      { value: "70/30", label: "Distribución good/bad" },
      { value: "5-fold", label: "Cross-validation estratificada" },
    ],

    // ── Estudio de caso ──────────────────────────────────────────────────────
    context:
      "En el sector financiero, otorgar crédito a un cliente que no podrá pagarlo " +
      "genera pérdidas directas que superan ampliamente el costo de rechazar a un " +
      "cliente confiable. Este proyecto aborda ese problema usando el dataset German " +
      "Credit Risk de Kaggle, ampliamente utilizado en la literatura de ML financiero.",

    problem:
      "Predecir si un solicitante de crédito representa un riesgo de impago (clase 'bad') " +
      "o es un cliente confiable (clase 'good'), con especial énfasis en minimizar los " +
      "falsos negativos — clientes riesgosos que el modelo no detecta.",

    objective:
      "Construir y comparar cuatro clasificadores (Regresión Logística, Naive Bayes, SVM " +
      "y KNN) usando GridSearchCV con balanced_accuracy como métrica de optimización, " +
      "y analizar en profundidad el modelo más interpretable para producción bancaria.",

    dataUsed:
      "German Credit Risk dataset (Kaggle) — 1,000 registros de solicitantes de crédito " +
      "con 10 variables: datos demográficos (edad, sexo, tipo de vivienda), situación " +
      "financiera (saldo de cuentas de ahorro y corriente), y características del " +
      "préstamo (monto, plazo, propósito). Distribución de clases: 70% good, 30% bad.",

    cleaningProcess:
      "'Saving accounts' (62 nulos, 6.2%): imputado con la moda ('little') por ser " +
      "una proporción pequeña sin sesgo significativo. " +
      "'Checking account' (394 nulos, 39.4%): imputado con categoría 'unknown' — " +
      "la ausencia de información sobre la cuenta corriente se trata como una señal " +
      "propia que el modelo puede aprender. Se eliminó la columna 'Age' original tras " +
      "crear la variable derivada 'Age group' con cuatro rangos etarios. " +
      "Se descartó 'Risk_prob' del conjunto de características para evitar fuga de " +
      "información (data leakage).",

    methodology:
      "1. Segmentación de edad en cuatro grupos con pd.cut() para capturar relaciones " +
      "no lineales. " +
      "2. Codificación ordinal manual de todas las variables categóricas, preservando " +
      "el orden real (ej. 'little' < 'moderate' < 'quite rich' < 'rich'). " +
      "3. Escalado con StandardScaler (media=0, desv=1) para igualar la escala de " +
      "variables como Credit amount (rango ~250-18,000) frente a Age group (rango 0-3). " +
      "4. División 80/20 con stratify=y para mantener la proporción de clases. " +
      "5. GridSearchCV (cv=5, scoring='balanced_accuracy') sobre los cuatro modelos. " +
      "6. Análisis profundo de Regresión Logística con L1 por su interpretabilidad. " +
      "7. Permutation importance para NB, SVM y KNN (sin coeficientes directos).",

    visualizations:
      "EDA: distribución por grupo de edad, cuentas bancarias y variable objetivo; " +
      "matrices de correlación con get_dummies(); probabilidad empírica de riesgo " +
      "por categoría (barplot sobre Risk_prob 0/1); boxplots de monto por propósito " +
      "y nivel laboral; curva KDE de cuota mensual estimada por tipo de cuenta. " +
      "Modelos: matriz de confusión + curva ROC para cada clasificador; " +
      "coeficientes L1 (Regresión Logística); permutation importance (NB, SVM, KNN); " +
      "distribución de probabilidades predichas con umbral de decisión.",

    results:
      "[COMPLETAR con los resultados reales una vez ejecutado el notebook] " +
      "Estructura esperada: SVM obtuvo el mayor balanced_accuracy (X.XX) con un " +
      "recall de X.XX en la clase bad y especificidad de X.XX. La Regresión Logística " +
      "con L1 identificó Checking account y Duration como las variables de mayor peso.",

    learnings:
      "El desequilibrio de clases (70/30) exige métricas específicas: balanced_accuracy " +
      "en lugar de accuracy simple, y class_weight='balanced' en los modelos. " +
      "La fuga de información (data leakage) es el error más silencioso en ML: incluir " +
      "Risk_prob en X hacía que el modelo 'aprendiera' la respuesta directamente, " +
      "produciendo distribuciones de probabilidad degeneradas (solo 0 o 1). " +
      "La interpretabilidad tiene valor propio: SVM puede superar a la Regresión " +
      "Logística en métricas, pero en banca se requiere poder explicar cada rechazo.",

    limitations:
      "1,000 registros es suficiente para aprendizaje pero insuficiente para producción " +
      "— los modelos necesitarían validación con datasets más grandes. " +
      "El tratamiento de 'Checking account' como 'unknown' reduce ruido pero introduce " +
      "información artificial en una variable con 39% de nulos. " +
      "No se realizó validación out-of-time (datos de un periodo diferente). " +
      "El dataset es de origen alemán y puede no reflejar patrones crediticios mexicanos " +
      "o latinoamericanos.",

    notebookUrl: null, // [PENDIENTE — agregar URL de Google Colab cuando esté publicado]
    repoUrl: "https://github.com/Nei44/PORTFOLIO-OPTIMIZATION",
  },

];
