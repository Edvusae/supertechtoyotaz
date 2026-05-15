
const CONFIG = {
    // 1. PLACE YOUR KEY HERE AFTER GENERATING IT
    API_KEY: "YOUR_ACTUAL_API_KEY_HERE", 
    CATEGORIES: ['performance', 'accessibility', 'best-practices', 'seo'],
    COLORS: { GOOD: '#00c345', AVERAGE: '#ffa400', FAIL: '#ff4e42' }
};

const UI = {
    btn: document.getElementById('analyzeBtn'),
    input: document.getElementById('urlInput'),
    loader: document.getElementById('loading'),
    resultsSection: document.getElementById('resultsSection'),
    canvas: document.getElementById('scoreChart').getContext('2d')
};

UI.btn.addEventListener('click', async () => {
    // 2. CLEAN THE URL (Removes periods/parentheses that break the API)
    const url = UI.input.value.trim().replace(/[).]+$/, "");
    if (!url) return alert('Please enter a valid URL');

    setLoadingState(true);

    try {
        const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO&key=${CONFIG.API_KEY}`;
        
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        const scores = formatScores(data.lighthouseResult.categories);
        renderLighthouseUI(scores);

    } catch (error) {
        handleAuditError(error);
    } finally {
        setLoadingState(false);
    }
});

function handleAuditError(error) {
    console.error("Audit Failed:", error);
    
    // 3. THE FIX: If Quota is hit, show Mock Data so the UI doesn't break
    if (error.message.includes("Quota exceeded") || error.message.includes("API key")) {
        console.warn("Using Fallback Data due to API limits.");
        const mockScores = { Performance: 92, Accessibility: 100, "Best Practices": 96, SEO: 100 };
        renderLighthouseUI(mockScores);
        alert("API Limit reached. Showing demo data for visualization.");
    } else {
        alert(`Error: ${error.message}`);
    }
}

function renderLighthouseUI(scores) {
    UI.resultsSection.classList.remove('hidden');
    // Your existing renderChart(scores) logic here...
}

function setLoadingState(show) {
    UI.loader.classList.toggle('hidden', !show);
    UI.btn.disabled = show;
    UI.btn.textContent = show ? 'Analyzing...' : 'Analyze';
}