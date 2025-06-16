// Seating data
const seatingData = {
    'HT1': ['何熰熾校長', '傅姑娘牧師', '葉向華助校', '劉鑒鋒助校', '譚敬民助校', '梁婉儀老師', '吳妙齡老師'],
    'HT2': ['葉菁菁老師', '梁諾琛老師', '黃寶賢老師', '周綺婷老師', '黃慕晴老師', '吳家賢老師', '葉慧婷老師', '鄺錦麟老師', '陳美施老師'],
    'Table 3': ['葉維善老師', '李泯鋒老師', '辛旻默老師', '劉德隆老師', '郭庭懿老師', '胡日晃老師', '楊振浩老師', '黃劍樂老師', '余嘉俊老師'],
    'Table 5': ['陳國容老師', '胡俊如老師', '林穎嘉老師', '翁俊傑老師', '王志寶老師', '黎灝顓老師', '楊振強老師', '黎浩謙老師', '顏偉恩老師'],
    'Table 7 (Class 6A)': ['陳紀柔', '萬栢彤', '李欣蒨', '陳臻瑩', '陳俊希', '馬詩穎', '黃韵懿', '楊曉彤', '尹熙蕾'],
    'Table 8 (Class 6D)': ['陳俊安', '陳希朗', '陳嘉遙', '陳紀雅', '陳然韜', '鄭思成', '張曉晴', '趙良魁', '周婉晴', '夏穎詩', '林海澄'],
    'Table 9 (Class 6C)': ['黃思朗', '關令晞', '趙康傑', '李思穎', '梁政楠', '李子健', '林宇旻', '莫琪慧', '吳明晉', '鄧耀尊', '黃曉晴'],
    'Table 10 (Class 6B)': ['陳藍', '陳希潼', '陳靖琳', '陳麗桉', '江晴朗', '曹美欣', '林銳東', '李卓盈'],
    'Table 11 (Class 6B)': ['曾晶晶', '徐駿佑', '梁穎嘉', '莫青霖', '黃晞晴', '黃海昕', '黃心靖', '黃梓朗'],
    'Table 12 (Class 6A)': ['李芷悠', '洪樂瑤', '何詩恩', '鄭凱盈', '黃梓悠', '陳梓健', '尹希雋', '鍾閔晴', '吳梓瑤'],
    'Table 13（Class 6D)': ['林栢軒', '羅家駿', '李沛鋕', '文昊', '梅利姍', '蕭敬翹', '田頌揚', '黃雪盈', '黃穎琳', '黃悅齊'],
    'Table 15 (Class 6C)': ['陳紫晴', '張錦文', '李易翀', '李曉彤', '黃俊熙', '楊凱彤', '楊可晴', '余玟謙', '翁凜璃'],
    'Table 16 (Class 6B)': ['張婉琪', '鍾明晞', '符芊穎', '劉凱瑤', '劉家源', '李政源', '梁君仰', '梁曦陽'],
    'Table 17 (Class 6A)': ['陳麒鴻', '詹皓霆', '李柏熙', '梁文朗', '梁栢軒', '楊正', '余淼鑫', '袁進', '劉廣琛']
};

// Populate dropdown
function populateTableDropdown() {
    const tableSelect = document.getElementById('tableSearch');
    Object.keys(seatingData).forEach(table => {
        const option = document.createElement('option');
        option.value = table;
        option.textContent = table;
        tableSelect.appendChild(option);
    });
}

// Search by name
function searchByName(name) {
    const results = [];
    const searchTerm = name.toLowerCase().trim();

    if (!searchTerm) return results;

    Object.entries(seatingData).forEach(([table, people]) => {
        people.forEach(person => {
            if (person.toLowerCase().includes(searchTerm)) {
                results.push({ table, person, people });
            }
        });
    });

    return results;
}

// Search by table
function searchByTable(tableName) {
    if (!tableName || !seatingData[tableName]) return null;
    return { table: tableName, people: seatingData[tableName] };
}

// Display results
function displayResults(results, isTableSearch = false) {
    const resultsDiv = document.getElementById('results');

    if (!results || (Array.isArray(results) && results.length === 0)) {
        resultsDiv.innerHTML = '<div class="no-results">沒有找到相關結果 No results found</div>';
        return;
    }

    let html = '';

    if (isTableSearch) {
        html = `
            <div class="result-card">
                <h3>${results.table}</h3>
                <p>此桌共有 ${results.people.length} 人</p>
                <div class="people-grid">
                    ${results.people.map(person => `<div class="person-card">${person}</div>`).join('')}
                </div>
            </div>
        `;
    } else {
        results.forEach(result => {
            html += `
                <div class="result-card">
                    <h3>${result.person} → ${result.table}</h3>
                    <p>同桌人員 Table companions:</p>
                    <div class="people-grid">
                        ${result.people.map(person =>
                            `<div class="person-card ${person === result.person ? 'highlight' : ''}">${person}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        });
    }

    resultsDiv.innerHTML = html;
}

// Show all tables
function showAllTables() {
    const resultsDiv = document.getElementById('results');
    let html = '<div class="table-overview">';

    Object.entries(seatingData).forEach(([table, people]) => {
        html += `
            <div class="table-card">
                <h4>${table}</h4>
                <p>${people.length} 人</p>
                <div style="margin-top: 10px;">
                    ${people.map(person => `<span class="person">${person}</span>`).join('')}
                </div>
            </div>
        `;
    });

    html += '</div>';
    resultsDiv.innerHTML = html;
}

// Add highlight style
function addHighlightStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .person-card.highlight {
            background: rgba(255, 255, 255, 0.4) !important;
            border: 2px solid rgba(255, 255, 255, 0.8);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Apply auto dark mode
function applySystemTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
    }
}

// Watch for theme changes
function watchThemeChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// Event listeners
function initializeEvents() {
    document.getElementById('nameSearch').addEventListener('input', function (e) {
        const results = searchByName(e.target.value);
        displayResults(results);
        if (e.target.value) {
            document.getElementById('tableSearch').value = '';
        }
    });

    document.getElementById('tableSearch').addEventListener('change', function (e) {
        const result = searchByTable(e.target.value);
        displayResults(result, true);
        if (e.target.value) {
            document.getElementById('nameSearch').value = '';
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', function () {
    populateTableDropdown();
    showAllTables();
    addHighlightStyle();
    applySystemTheme();
    watchThemeChange();
    initializeEvents();
});
