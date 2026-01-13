/* ================================================
   SALARY SLIP MANAGEMENT SYSTEM - JAVASCRIPT
   Interactive Functionality & Animations
   ================================================ */

// ================================================
// GLOBAL VARIABLES & DUMMY DATA
// ================================================
const dummyData = {
    workers: [
        { id: 'W001', name: 'Rajesh Kumar', phone: '9876543210', address: 'Delhi', joinDate: '2023-01-15', status: 'Active' },
        { id: 'W002', name: 'Priya Sharma', phone: '9876543211', address: 'Mumbai', joinDate: '2023-02-20', status: 'Active' },
        { id: 'W003', name: 'Amit Singh', phone: '9876543212', address: 'Bangalore', joinDate: '2023-03-10', status: 'Inactive' },
        { id: 'W004', name: 'Sunita Devi', phone: '9876543213', address: 'Chennai', joinDate: '2023-01-25', status: 'Active' },
        { id: 'W005', name: 'Ravi Patel', phone: '9876543214', address: 'Pune', joinDate: '2023-04-05', status: 'Active' }
    ],
    salarySlips: [
        { id: 'SS001', workerId: 'W001', workerName: 'Rajesh Kumar', month: 'December 2024', workingDays: 26, dailyWage: 500, grossSalary: 13000, pfDeduction: 1560, netSalary: 11440, status: 'Generated' },
        { id: 'SS002', workerId: 'W002', workerName: 'Priya Sharma', month: 'December 2024', workingDays: 24, dailyWage: 450, grossSalary: 10800, pfDeduction: 1296, netSalary: 9504, status: 'Generated' },
        { id: 'SS003', workerId: 'W004', workerName: 'Sunita Devi', month: 'December 2024', workingDays: 25, dailyWage: 480, grossSalary: 12000, pfDeduction: 1440, netSalary: 10560, status: 'Pending' },
        { id: 'SS004', workerId: 'W005', workerName: 'Ravi Patel', month: 'December 2024', workingDays: 22, dailyWage: 520, grossSalary: 11440, pfDeduction: 1372.8, netSalary: 10067.2, status: 'Generated' }
    ],
    stats: {
        totalWorkers: 5,
        activeWorkers: 4,
        workingDays: 26,
        grossSalary: 47240,
        pfDeduction: 5668.8,
        netSalary: 41571.2
    }
};

// ================================================
// AUTHENTICATION FUNCTIONS
// ================================================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.password-strength-bar');
    if (!strengthBar) return;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strengthBar.className = 'password-strength-bar';
    if (strength <= 1) {
        strengthBar.classList.add('strength-weak');
    } else if (strength <= 2) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
}

function handleLogin(event) {
    event.preventDefault();
    // Backend integration point - validate credentials
    showMessage('Login successful! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleSignup(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    // Backend integration point - create account
    showMessage('Account created successfully! Please login.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function showMessage(message, type) {
    // Create or update message element
    let messageEl = document.querySelector('.auth-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'auth-message';
        document.querySelector('.auth-card').appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `auth-message ${type}`;
    messageEl.style.cssText = `
        padding: 12px 16px;
        border-radius: 6px;
        margin-top: 16px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 'background: rgba(16, 185, 129, 0.1); color: #10b981;' : 'background: rgba(239, 68, 68, 0.1); color: #ef4444;'}
    `;
    
    setTimeout(() => {
        if (messageEl) messageEl.remove();
    }, 5000);
}

// ================================================
// SIDEBAR & NAVIGATION
// ================================================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    
    // Save state to localStorage for persistence
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        }
    });
}

function initializeSidebar() {
    // Restore sidebar state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        document.querySelector('.sidebar')?.classList.add('collapsed');
    }
    
    // Set active navigation item
    setActiveNavItem();
}

// ================================================
// DASHBOARD FUNCTIONS
// ================================================
function loadDashboardStats() {
    const statsElements = {
        totalWorkers: document.getElementById('totalWorkers'),
        workingDays: document.getElementById('workingDays'),
        grossSalary: document.getElementById('grossSalary'),
        pfDeduction: document.getElementById('pfDeduction'),
        netSalary: document.getElementById('netSalary')
    };
    
    // Animate counter effect
    Object.keys(statsElements).forEach(key => {
        const element = statsElements[key];
        if (element) {
            const value = dummyData.stats[key];
            animateCounter(element, 0, value, 1000);
        }
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isMonetary = ['grossSalary', 'pfDeduction', 'netSalary'].includes(element.id);
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        if (isMonetary) {
            element.textContent = '₹' + current.toLocaleString('en-IN');
        } else {
            element.textContent = current.toLocaleString('en-IN');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function loadRecentSalarySlips() {
    const tableBody = document.getElementById('recentSalarySlipsTable');
    if (!tableBody) return;
    
    const recentSlips = dummyData.salarySlips.slice(0, 5);
    
    tableBody.innerHTML = recentSlips.map(slip => `
        <tr>
            <td>${slip.workerId}</td>
            <td>${slip.workerName}</td>
            <td>${slip.month}</td>
            <td>₹${slip.netSalary.toLocaleString('en-IN')}</td>
            <td><span class="status-badge status-${slip.status.toLowerCase()}">${slip.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-secondary" onclick="viewSalarySlip('${slip.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="downloadSalarySlip('${slip.id}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadNotifications() {
    const notificationsContainer = document.getElementById('notificationsContainer');
    if (!notificationsContainer) return;
    
    const notifications = [
        { type: 'success', message: 'December 2024 salary slips generated successfully for 4 workers.' },
        { type: 'warning', message: '1 worker has incomplete attendance data for December 2024.' },
        { type: 'info', message: 'PF rate updated to 12% effective from January 2025.' }
    ];
    
    notificationsContainer.innerHTML = notifications.map(notif => `
        <div class="notification notification-${notif.type}">
            <i class="fas fa-${notif.type === 'success' ? 'check-circle' : notif.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${notif.message}</span>
        </div>
    `).join('');
}

// ================================================
// WORKERS PAGE FUNCTIONS
// ================================================
function loadWorkersTable() {
    const tableBody = document.getElementById('workersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = dummyData.workers.map(worker => `
        <tr>
            <td>${worker.id}</td>
            <td>${worker.name}</td>
            <td>${worker.phone}</td>
            <td>${worker.address}</td>
            <td>${worker.joinDate}</td>
            <td><span class="status-badge status-${worker.status.toLowerCase()}">${worker.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-secondary" onclick="viewWorker('${worker.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editWorker('${worker.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function searchWorkers() {
    const searchTerm = document.getElementById('workerSearch').value.toLowerCase();
    const filteredWorkers = dummyData.workers.filter(worker => 
        worker.name.toLowerCase().includes(searchTerm) ||
        worker.id.toLowerCase().includes(searchTerm) ||
        worker.phone.includes(searchTerm)
    );
    
    const tableBody = document.getElementById('workersTableBody');
    tableBody.innerHTML = filteredWorkers.map(worker => `
        <tr>
            <td>${worker.id}</td>
            <td>${worker.name}</td>
            <td>${worker.phone}</td>
            <td>${worker.address}</td>
            <td>${worker.joinDate}</td>
            <td><span class="status-badge status-${worker.status.toLowerCase()}">${worker.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-secondary" onclick="viewWorker('${worker.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editWorker('${worker.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewWorker(workerId) {
    // Backend integration point - fetch worker details
    showMessage(`Viewing worker ${workerId} details`, 'info');
}

function editWorker(workerId) {
    // Backend integration point - edit worker
    showMessage(`Editing worker ${workerId}`, 'info');
}

// ================================================
// SALARY SLIPS PAGE FUNCTIONS
// ================================================
function loadSalarySlipsTable() {
    const tableBody = document.getElementById('salarySlipsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = dummyData.salarySlips.map(slip => `
        <tr>
            <td>${slip.id}</td>
            <td>${slip.workerId}</td>
            <td>${slip.workerName}</td>
            <td>${slip.month}</td>
            <td>${slip.workingDays}</td>
            <td>₹${slip.grossSalary.toLocaleString('en-IN')}</td>
            <td>₹${slip.pfDeduction.toLocaleString('en-IN')}</td>
            <td>₹${slip.netSalary.toLocaleString('en-IN')}</td>
            <td><span class="status-badge status-${slip.status.toLowerCase()}">${slip.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-secondary" onclick="viewSalarySlip('${slip.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-success" onclick="printSalarySlip('${slip.id}')">
                        <i class="fas fa-print"></i> Print
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="downloadSalarySlip('${slip.id}')">
                        <i class="fas fa-download"></i> PDF
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewSalarySlip(slipId) {
    const slip = dummyData.salarySlips.find(s => s.id === slipId);
    if (!slip) return;
    
    // Show modal with salary slip details
    showSalarySlipModal(slip);
}

function showSalarySlipModal(slip) {
    const modalHTML = `
        <div class="modal-overlay active" id="salarySlipModal">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">Salary Slip - ${slip.month}</h3>
                    <button class="modal-close" onclick="closeSalarySlipModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="salary-slip-preview">
                        <div class="slip-header text-center mb-3">
                            <h2>ABC Construction Company</h2>
                            <p>Salary Slip for ${slip.month}</p>
                        </div>
                        <div class="slip-details">
                            <div class="row mb-2">
                                <div class="col"><strong>Worker ID:</strong> ${slip.workerId}</div>
                                <div class="col"><strong>Name:</strong> ${slip.workerName}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col"><strong>Working Days:</strong> ${slip.workingDays}</div>
                                <div class="col"><strong>Daily Wage:</strong> ₹${slip.dailyWage}</div>
                            </div>
                            <hr>
                            <div class="row mb-2">
                                <div class="col"><strong>Gross Salary:</strong></div>
                                <div class="col text-right">₹${slip.grossSalary.toLocaleString('en-IN')}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col"><strong>PF Deduction (12%):</strong></div>
                                <div class="col text-right">₹${slip.pfDeduction.toLocaleString('en-IN')}</div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col"><strong>Net Salary:</strong></div>
                                <div class="col text-right"><strong>₹${slip.netSalary.toLocaleString('en-IN')}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeSalarySlipModal() {
    const modal = document.getElementById('salarySlipModal');
    if (modal) {
        modal.remove();
    }
}

function printSalarySlip(slipId) {
    // Backend integration point - generate printable version
    showMessage(`Printing salary slip ${slipId}`, 'info');
}

function downloadSalarySlip(slipId) {
    // Backend integration point - generate PDF
    showMessage(`Downloading salary slip ${slipId} as PDF`, 'success');
}

// ================================================
// EXCEL UPLOAD FUNCTIONS
// ================================================
function initializeUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (!uploadArea || !fileInput) return;
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function handleFileUpload(file) {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        showMessage('Please select a valid Excel file (.xlsx or .xls)', 'error');
        return;
    }
    
    // Show upload progress
    showUploadProgress(file.name);
    
    // Simulate file processing
    setTimeout(() => {
        showUploadResults();
    }, 3000);
}

function showUploadProgress(fileName) {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="upload-progress">
            <i class="fas fa-file-excel upload-icon" style="color: #10b981;"></i>
            <div class="upload-text">Processing ${fileName}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%;"></div>
            </div>
            <div class="upload-subtext">Please wait while we process your file...</div>
        </div>
    `;
    
    // Animate progress bar
    const progressFill = uploadArea.querySelector('.progress-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 300);
}

function showUploadResults() {
    const resultsContainer = document.getElementById('uploadResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Total Records</span>
                    <div class="stat-icon blue">
                        <i class="fas fa-file-alt"></i>
                    </div>
                </div>
                <div class="stat-value">150</div>
                <div class="stat-change positive">+150 new records</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Successfully Processed</span>
                    <div class="stat-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="stat-value">145</div>
                <div class="stat-change positive">96.7% success rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Errors</span>
                    <div class="stat-icon red">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                </div>
                <div class="stat-value">5</div>
                <div class="stat-change negative">3.3% error rate</div>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                <h3 class="card-title">Processing Complete</h3>
            </div>
            <div class="card-body">
                <div class="notification notification-success">
                    <i class="fas fa-check-circle"></i>
                    <span>Excel file processed successfully! 145 salary records have been imported.</span>
                </div>
                <button class="btn btn-primary mt-2" onclick="viewProcessedData()">
                    <i class="fas fa-table"></i> View Processed Data
                </button>
            </div>
        </div>
    `;
    
    resultsContainer.classList.remove('hidden');
}

function viewProcessedData() {
    // Backend integration point - show processed data
    window.location.href = 'salary-slips.html';
}

// ================================================
// REPORTS FUNCTIONS
// ================================================
function loadReportsData() {
    // Load summary cards
    const summaryData = [
        { title: 'Total Payroll', value: '₹4,72,400', icon: 'fas fa-rupee-sign', color: 'blue' },
        { title: 'PF Contributions', value: '₹56,688', icon: 'fas fa-piggy-bank', color: 'green' },
        { title: 'Active Workers', value: '45', icon: 'fas fa-users', color: 'purple' },
        { title: 'Avg. Daily Wage', value: '₹485', icon: 'fas fa-calculator', color: 'orange' }
    ];
    
    const summaryContainer = document.getElementById('reportsSummary');
    if (summaryContainer) {
        summaryContainer.innerHTML = summaryData.map(item => `
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">${item.title}</span>
                    <div class="stat-icon ${item.color}">
                        <i class="${item.icon}"></i>
                    </div>
                </div>
                <div class="stat-value">${item.value}</div>
            </div>
        `).join('');
    }
}

function downloadReport(reportType) {
    // Backend integration point - generate and download report
    showMessage(`Downloading ${reportType} report...`, 'success');
}

// ================================================
// SETTINGS FUNCTIONS
// ================================================
function loadSettings() {
    // Load current settings from backend/localStorage
    const settings = {
        companyName: 'ABC Construction Company',
        companyAddress: '123 Business Street, City, State - 123456',
        pfPercentage: 12,
        overtimeRate: 1.5,
        theme: 'default'
    };
    
    // Populate form fields
    Object.keys(settings).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = settings[key];
        }
    });
}

function saveSettings(event) {
    event.preventDefault();
    
    // Backend integration point - save settings
    showMessage('Settings saved successfully!', 'success');
}

// ================================================
// UTILITY FUNCTIONS
// ================================================
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================================
// INITIALIZATION
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar
    initializeSidebar();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            loadDashboardStats();
            loadRecentSalarySlips();
            loadNotifications();
            break;
        case 'workers.html':
            loadWorkersTable();
            break;
        case 'salary-slips.html':
            loadSalarySlipsTable();
            break;
        case 'excel-upload.html':
            initializeUploadArea();
            break;
        case 'reports.html':
            loadReportsData();
            break;
        case 'settings.html':
            loadSettings();
            break;
    }
    
    // Add event listeners for password strength check
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
        });
    }
    
    // Add search functionality with debounce
    const searchInput = document.getElementById('workerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchWorkers, 300));
    }
    
    // Mobile sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.remove();
        }
    });
});

// ================================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ================================================
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.toggleSidebar = toggleSidebar;
window.viewWorker = viewWorker;
window.editWorker = editWorker;
window.viewSalarySlip = viewSalarySlip;
window.printSalarySlip = printSalarySlip;
window.downloadSalarySlip = downloadSalarySlip;
window.closeSalarySlipModal = closeSalarySlipModal;
window.viewProcessedData = viewProcessedData;
window.downloadReport = downloadReport;
window.saveSettings = saveSettings;