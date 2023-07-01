// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBOheO3EDtvG6hIuW_DsPqrgXDewgH05Bo",
    authDomain: "makini-primary-school.firebaseapp.com",
    projectId: "makini-primary-school",
    storageBucket: "makini-primary-school.appspot.com",
    messagingSenderId: " 674323284246",
    appId: "1:674323284246:web:375917bf55d971c2991037"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Database Reference
var database = firebase.database();

// Function to save a student's admission data to the database
function saveAdmissionData(name, admissionNumber, dateOfAdmission) {
    var newAdmissionRef = database.ref('admissions').push();
    newAdmissionRef.set({
        name: name,
        admissionNumber: admissionNumber,
        dateOfAdmission: dateOfAdmission
    });
}

// Event listener for the registration form submission
var registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var admissionNumber = document.getElementById('admission').value;
        var dateOfAdmission = document.getElementById('date').value;
        saveAdmissionData(name, admissionNumber, dateOfAdmission);
        alert('Student admitted successfully!');
        registrationForm.reset();
    });
}
// Function to search for student records based on admission number
function searchRecords(admissionNumber) {
    var recordsRef = database.ref('admissions');
    recordsRef.orderByChild('admissionNumber').equalTo(admissionNumber).once('value', function(snapshot) {
        // Handle the retrieved records
        var records = snapshot.val();
        if (records) {
            // Display the records in the student record section
            var studentRecordSection = document.getElementById('student-record');
            // Clear previous records
            studentRecordSection.innerHTML = '';

            // Loop through the records and display each record
            for (var recordKey in records) {
                var record = records[recordKey];
                var recordHtml = '<div><h3>' + record.name + '</h3>';
                recordHtml += '<p>Admission Number: ' + record.admissionNumber + '</p>';
                recordHtml += '<p>Date of Admission: ' + record.dateOfAdmission + '</p></div>';

                studentRecordSection.innerHTML += recordHtml;
            }
        } else {
            alert('No records found.');
        }
    });
}

// Event listener for the search form submission
var searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var admissionNumber = document.getElementById('admission-search').value;
        searchRecords(admissionNumber);
        searchForm.reset();
    });
}
// Check userAgent
if (navigator.userAgent) {
    // UserAgent is being used
    console.log('navigator.userAgent is being used:', navigator.userAgent);
  } else {
    console.log('navigator.userAgent is not being used.');
  }
  
  // Check appVersion
  if (navigator.appVersion) {
    // AppVersion is being used
    console.log('navigator.appVersion is being used:', navigator.appVersion);
  } else {
    console.log('navigator.appVersion is not being used.');
  }
  
  // Check platform
  if (navigator.platform) {
    // Platform is being used
    console.log('navigator.platform is being used:', navigator.platform);
  } else {
    console.log('navigator.platform is not being used.');
  }
  