
        document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    const toastEl = document.getElementById('toastNotification');
    const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 3000 });
    
    // Set current date
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    // Sample data - in a real app, this would come from an API
    const teacherData = {
        name: "Prof. John Smith",
        department: "Computer Science",
        email: "john.smith@university.edu",
        phone: "+1 234 567 890",
        courses: 4,
        students: 120,
        todayClasses: 2
    };
    
    const courses = [
        { id: 1, code: "CS101", name: "Software Engineering", department: "Computer Science", time: "09:00 AM - 10:30 AM", room: "CS-101", students: 30 },
        { id: 2, code: "CS201", name: "Computer Networking", department: "Computer Science", time: "11:00 AM - 12:30 PM", room: "CS-201", students: 25 },
        { id: 3, code: "CS301", name: "Embedded System Programming", department: "Computer Science", time: "02:00 PM - 03:30 PM", room: "CS-301", students: 35 },
        { id: 4, code: "CS401", name: "Theory of Computation", department: "Computer Science", time: "04:00 PM - 05:30 PM", room: "CS-401", students: 30 }
    ];
    
    const students = {
        1: [
            { id: 1, rollNo: "CS101-001", name: "Alice Johnson", status: "pending" },
            { id: 2, rollNo: "CS101-002", name: "Bob Williams", status: "pending" },
            { id: 3, rollNo: "CS101-003", name: "Charlie Brown", status: "pending" },
            { id: 4, rollNo: "CS101-004", name: "David Miller", status: "pending" },
            { id: 5, rollNo: "CS101-005", name: "Eva Davis", status: "pending" }
        ],
        2: [
            { id: 6, rollNo: "CS201-001", name: "Frank Wilson", status: "pending" },
            { id: 7, rollNo: "CS201-002", name: "Grace Moore", status: "pending" },
            { id: 8, rollNo: "CS201-003", name: "Henry Taylor", status: "pending" },
            { id: 9, rollNo: "CS201-004", name: "Ivy Anderson", status: "pending" },
            { id: 10, rollNo: "CS201-005", name: "Jack Thomas", status: "pending" }
        ],
        3: [
            { id: 11, rollNo: "CS301-001", name: "Karen Jackson", status: "pending" },
            { id: 12, rollNo: "CS301-002", name: "Leo White", status: "pending" },
            { id: 13, rollNo: "CS301-003", name: "Mia Harris", status: "pending" },
            { id: 14, rollNo: "CS301-004", name: "Noah Martin", status: "pending" },
            { id: 15, rollNo: "CS301-005", name: "Olivia Garcia", status: "pending" }
        ],
        4: [
            { id: 16, rollNo: "CS401-001", name: "Paul Martinez", status: "pending" },
            { id: 17, rollNo: "CS401-002", name: "Quinn Robinson", status: "pending" },
            { id: 18, rollNo: "CS401-003", name: "Rachel Clark", status: "pending" },
            { id: 19, rollNo: "CS401-004", name: "Sam Rodriguez", status: "pending" },
            { id: 20, rollNo: "CS401-005", name: "Tina Lewis", status: "pending" }
        ]
    };
    
    const attendanceRecords = {
        1: [
            { date: '2025-07-01', present: 28, absent: 2 },
            { date: '2025-07-08', present: 25, absent: 5 },
            { date: '2025-07-15', present: 27, absent: 3 },
            { date: '2025-07-22', present: 30, absent: 0 },
            { date: '2025-07-29', present: 26, absent: 4 }
        ],
        2: [
            { date: '2025-07-02', present: 22, absent: 3 },
            { date: '2025-07-09', present: 24, absent: 1 },
            { date: '2025-07-16', present: 20, absent: 5 },
            { date: '2025-07-23', present: 25, absent: 0 },
            { date: '2025-07-30', present: 23, absent: 2 }
        ],
        3: [
            { date: '2025-07-03', present: 32, absent: 3 },
            { date: '2025-07-10', present: 30, absent: 5 },
            { date: '2025-07-17', present: 33, absent: 2 },
            { date: '2025-07-24', present: 35, absent: 0 },
            { date: '2025-07-01', present: 31, absent: 4 }
        ],
        4: [
            { date: '2025-07-05', present: 27, absent: 3 },
            { date: '2025-07-12', present: 29, absent: 1 },
            { date: '2025-07-19', present: 25, absent: 5 },
            { date: '2025-07-26', present: 30, absent: 0 },
            { date: '2025-07-03', present: 28, absent: 2 }
        ]
    };
    
    // Initialize dashboard
    function initDashboard() {
        // Set teacher info
        document.getElementById('teacherName').textContent = teacherData.name;
        document.getElementById('teacherDept').textContent = teacherData.department;
        document.getElementById('totalCourses').textContent = teacherData.courses;
        document.getElementById('totalStudents').textContent = teacherData.students;
        document.getElementById('todaysClasses').textContent = teacherData.todayClasses;
        
        // Populate schedule table
        const scheduleTable = document.getElementById('scheduleTable');
        scheduleTable.innerHTML = '';
        
        courses.slice(0, 2).forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.code} - ${course.name}</td>
                <td>${course.time}</td>
                <td>${course.room}</td>
            `;
            scheduleTable.appendChild(row);
        });
        
        // Initialize attendance chart
        initAttendanceChart();
    }
    
    // Initialize attendance chart
    function initAttendanceChart() {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const labels = courses.map(course => course.code);
        const presentData = [28, 22, 32, 27];
        const absentData = [2, 3, 3, 3];
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Present',
                        backgroundColor: '#1cc88a',
                        borderColor: '#1cc88a',
                        data: presentData
                    },
                    {
                        label: 'Absent',
                        backgroundColor: '#e74a3b',
                        borderColor: '#e74a3b',
                        data: absentData
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
    
    // Initialize attendance tab
    function initAttendanceTab() {
        const courseSelect = document.getElementById('courseSelect');
        const reportCourseSelect = document.getElementById('reportCourse');
        
        // Populate course dropdowns
        courseSelect.innerHTML = '<option selected disabled>Select a course</option>';
        reportCourseSelect.innerHTML = '<option selected disabled>Select a course</option>';
        
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = `${course.code} - ${course.name}`;
            courseSelect.appendChild(option.cloneNode(true));
            reportCourseSelect.appendChild(option);
        });
        
        // Handle course selection form submission
        document.getElementById('classSelectionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseId = parseInt(courseSelect.value);
            const date = document.getElementById('dateSelect').value;
            
            if (!courseId || !date) {
                showToast('Error', 'Please select both course and date', 'danger');
                return;
            }
            
            const selectedCourse = courses.find(c => c.id === courseId);
            
            // Update class info display
            document.getElementById('courseCodeDisplay').textContent = selectedCourse.code;
            document.getElementById('courseNameDisplay').textContent = selectedCourse.name;
            document.getElementById('courseDeptDisplay').textContent = selectedCourse.department;
            document.getElementById('classTimeDisplay').textContent = selectedCourse.time;
            document.getElementById('studentCountBadge').textContent = `${selectedCourse.students} students`;
            
            // Load students for attendance
            loadStudentsForAttendance(courseId);
            
            // Show attendance card
            document.getElementById('attendanceCard').classList.remove('d-none');
        });
        
        // Handle mark all present button
        document.getElementById('markAllPresent').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('#attendanceTable input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                const row = checkbox.closest('tr');
                row.querySelector('.status-indicator').className = 'attendance-status status-present';
                row.querySelector('.status-text').textContent = 'Present';
            });
        });
        
        // Handle mark all absent button
        document.getElementById('markAllAbsent').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('#attendanceTable input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                const row = checkbox.closest('tr');
                row.querySelector('.status-indicator').className = 'attendance-status status-absent';
                row.querySelector('.status-text').textContent = 'Absent';
            });
        });
        
        // Handle submit attendance button
        document.getElementById('submitAttendance').addEventListener('click', function() {
            const courseId = parseInt(courseSelect.value);
            const date = document.getElementById('dateSelect').value;
            const attendanceData = [];
            
            document.querySelectorAll('#attendanceTable tbody tr').forEach(row => {
                const studentId = parseInt(row.dataset.studentId);
                const isPresent = row.querySelector('input[type="checkbox"]').checked;
                attendanceData.push({
                    studentId: studentId,
                    present: isPresent
                });
            });
            
            // In a real app, you would send this data to the server
            console.log('Submitting attendance for course', courseId, 'on', date, ':', attendanceData);
            
            showToast('Success', 'Attendance submitted successfully', 'success');
            
            // Reset form
            document.getElementById('attendanceCard').classList.add('d-none');
            document.getElementById('classSelectionForm').reset();
        });
    }
    
    // Load students for attendance
    function loadStudentsForAttendance(courseId) {
        const attendanceTable = document.querySelector('#attendanceTable tbody');
        attendanceTable.innerHTML = '';
        
        const courseStudents = students[courseId];
        
        courseStudents.forEach(student => {
            const row = document.createElement('tr');
            row.dataset.studentId = student.id;
            
            row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>
                    <span class="status-indicator attendance-status status-${student.status}"></span>
                    <span class="status-text">${student.status === 'pending' ? 'Pending' : student.status === 'present' ? 'Present' : 'Absent'}</span>
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input attendance-checkbox" type="checkbox" ${student.status === 'present' ? 'checked' : ''}>
                    </div>
                </td>
            `;
            
            attendanceTable.appendChild(row);
        });
        
        // Add event listeners to checkboxes
        document.querySelectorAll('.attendance-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const row = this.closest('tr');
                const statusIndicator = row.querySelector('.status-indicator');
                const statusText = row.querySelector('.status-text');
                
                if (this.checked) {
                    statusIndicator.className = 'attendance-status status-present';
                    statusText.textContent = 'Present';
                } else {
                    statusIndicator.className = 'attendance-status status-absent';
                    statusText.textContent = 'Absent';
                }
            });
        });
    }
    
    // Initialize reports tab
    function initReportsTab() {
        // Handle report form submission
        document.getElementById('reportForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseId = parseInt(document.getElementById('reportCourse').value);
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (!courseId) {
                showToast('Error', 'Please select a course', 'danger');
                return;
            }
            
            // In a real app, you would fetch this data from the server
            const selectedCourse = courses.find(c => c.id === courseId);
            const records = attendanceRecords[courseId];
            
            // Update summary
            document.getElementById('reportSummaryText').classList.add('d-none');
            document.getElementById('reportSummaryTableContainer').classList.remove('d-none');
            
            const totalClasses = records.length;
            const totalPresent = records.reduce((sum, record) => sum + record.present, 0);
            const totalAbsent = records.reduce((sum, record) => sum + record.absent, 0);
            const avgAttendance = Math.round((totalPresent / (totalPresent + totalAbsent)) * 100);
            
            const presentCounts = records.map(r => r.present);
            const highestAttendance = Math.max(...presentCounts);
            const lowestAttendance = Math.min(...presentCounts);
            
            document.getElementById('totalClasses').textContent = totalClasses;
            document.getElementById('avgAttendance').textContent = `${avgAttendance}%`;
            document.getElementById('highestAttendance').textContent = highestAttendance;
            document.getElementById('lowestAttendance').textContent = lowestAttendance;
            
            // Show detailed report
            showDetailedReport(selectedCourse, records);
            
            // Show report results card
            document.getElementById('reportResultsCard').classList.remove('d-none');
        });
    }
    
    // Show detailed report
    function showDetailedReport(course, records) {
        // Update detailed report table
        const detailedTable = document.querySelector('#detailedReportTable tbody');
        detailedTable.innerHTML = '';
        
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.present}</td>
                <td>${record.absent}</td>
            `;
            detailedTable.appendChild(row);
        });
        
        // Initialize chart
        const ctx = document.getElementById('detailedReportChart').getContext('2d');
        
        // Destroy previous chart if exists
        if (window.detailedChart) {
            window.detailedChart.destroy();
        }
        
        const labels = records.map(r => new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        const presentData = records.map(r => r.present);
        const absentData = records.map(r => r.absent);
        
        window.detailedChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Present Students',
                        backgroundColor: '#1cc88a',
                        borderColor: '#1cc88a',
                        data: presentData,
                        fill: false
                    },
                    {
                        label: 'Absent Students',
                        backgroundColor: '#e74a3b',
                        borderColor: '#e74a3b',
                        data: absentData,
                        fill: false
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Attendance for ${course.code} - ${course.name}`,
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
    
    // Initialize settings tab
    function initSettingsTab() {
        // Handle teacher profile form submission
        document.getElementById('teacherProfileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would send this data to the server
            const updatedProfile = {
                name: document.getElementById('teacherFullName').value,
                email: document.getElementById('teacherEmail').value,
                phone: document.getElementById('teacherPhone').value,
                department: document.getElementById('teacherDepartment').value
            };
            
            console.log('Updating teacher profile:', updatedProfile);
            
            // Update displayed name
            document.getElementById('teacherName').textContent = updatedProfile.name;
            document.getElementById('teacherDept').textContent = updatedProfile.department;
            
            showToast('Success', 'Profile updated successfully', 'success');
        });
        
        // Handle change password form submission
        document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                showToast('Error', 'New passwords do not match', 'danger');
                return;
            }
            
            // In a real app, you would send this to the server
            console.log('Changing password:', { currentPassword, newPassword });
            
            // Reset form
            document.getElementById('changePasswordForm').reset();
            
            showToast('Success', 'Password changed successfully', 'success');
        });
    }
    
    // Show toast notification
    function showToast(title, message, type) {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        const toast = bootstrap.Toast.getInstance(document.getElementById('toastNotification'));
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Set background color based on type
        const toastEl = document.getElementById('toastNotification');
        toastEl.className = `toast bg-${type} text-white`;
        
        toast.show();
    }
    
    // Initialize all tabs
    initDashboard();
    initAttendanceTab();
    initReportsTab();
    initSettingsTab();
    
    // Set default date for attendance
    document.getElementById('dateSelect').valueAsDate = new Date();
    
    // Set default date range for reports (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    document.getElementById('startDate').valueAsDate = startDate;
    document.getElementById('endDate').valueAsDate = endDate;
});
