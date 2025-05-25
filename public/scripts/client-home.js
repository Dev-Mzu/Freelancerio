import getBaseUrl from './base-url.mjs';

const baseURL = getBaseUrl();

document.addEventListener("DOMContentLoaded", () => {
    function buildJobPostForm() {
        const displaySection = document.getElementById('display-section');
        displaySection.innerHTML = '';

        document.getElementById('client-page-heading').textContent = "Post a New Job";
      
        
        // Create the <article>
        const article = document.createElement('article');
        article.className = 'bg-white p-8 rounded shadow-md max-w-4xl mx-auto';
      
        // Hidden input: client ID
        const clientIdInput = document.createElement('input');
        clientIdInput.type = 'hidden';
        clientIdInput.id = 'clientId';
        clientIdInput.name = 'client_id';
        article.appendChild(clientIdInput);
      
        // Helper function to create a labeled input/textarea/select section
        function createField(labelText, inputElement, required = true) {
          const section = document.createElement('section');
          section.className = 'mb-4';
      
          const label = document.createElement('label');
          label.className = 'block text-gray-700 font-semibold mb-2';
          label.textContent = labelText;
          label.htmlFor = inputElement.id;
      
          if (required) inputElement.required = true;
      
          section.appendChild(label);
          section.appendChild(inputElement);
          return section;
        }
      
        // Job Title
        const jobTitleInput = document.createElement('input');
        jobTitleInput.type = 'text';
        jobTitleInput.id = 'jobTitle';
        jobTitleInput.name = 'job_title';
        jobTitleInput.placeholder = 'e.g. UI/UX Designer for E-commerce Platform';
        jobTitleInput.className = 'w-full border border-gray-300 p-2 rounded';
        article.appendChild(createField('Job Title*', jobTitleInput));
      
        // Job Description
        const jobDescriptionTextarea = document.createElement('textarea');
        jobDescriptionTextarea.id = 'jobDescription';
        jobDescriptionTextarea.name = 'job_description';
        jobDescriptionTextarea.placeholder = 'Describe the job...';
        jobDescriptionTextarea.className = 'w-full border border-gray-300 p-2 rounded';
        article.appendChild(createField('Job Description*', jobDescriptionTextarea));
      
        // Job Requirements
        const jobRequirementsTextarea = document.createElement('textarea');
        jobRequirementsTextarea.id = 'jobRequirements';
        jobRequirementsTextarea.name = 'job_requirements';
        jobRequirementsTextarea.placeholder = 'List required skills, experience, THey must be separated by a comma';
        jobRequirementsTextarea.className = 'w-full border border-gray-300 p-2 rounded';
        article.appendChild(createField('Job Requirements*', jobRequirementsTextarea));
      
        // Job Category
        const jobCategorySelect = document.createElement('select');
        jobCategorySelect.id = 'jobCategory';
        jobCategorySelect.name = 'job_category';
        jobCategorySelect.className = 'w-full border border-gray-300 p-2 rounded';
      
        const categories = [
          { value: '', text: 'Select a category' },
          { value: 'IT', text: 'IT' },
          { value: 'Marketing', text: 'Marketing' },
          { value: 'Finance', text: 'Finance' },
          { value: 'Design', text: 'Design' },
          { value: 'Education', text: 'Education' },
          { value: 'Healthcare', text: 'Healthcare' },
          { value: 'Construction', text: 'Construction' },
          { value: 'Other', text: 'Other' }
        ];
      
        categories.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          jobCategorySelect.appendChild(option);
        });
      
        article.appendChild(createField('Job Category*', jobCategorySelect));

        // Location Selection
        const locationCategorySelect = document.createElement('select');
        locationCategorySelect.id = 'locationCategory';
        locationCategorySelect.name = 'location_category';
        locationCategorySelect.className = 'w-full border border-gray-300 p-2 rounded';
      
        const location_categories = [
          { value: '', text: 'Select a category' },
          { value: 'Gauteng', text: 'Gauteng' },
          { value: 'Limpopo', text: 'Limpopo' },
          { value: 'Mpumalanga', text: 'Mpumalanga' },
          { value: 'North West', text: 'North West' },
          { value: 'KwaZulu-Natal', text: 'KwaZulu-Natal' },
          { value: 'Free State', text: 'Free State' },
          { value: 'Eastern Cape', text: 'Eastern Cape' },
          { value: 'Northern Cape', text: 'Northern Cape' },
          { value: 'Western Cape', text: 'Western Cape' },
          { value: 'Remote', text: 'Remote' },
          { value: 'Other', text: 'Other' }
        ];
      
        location_categories.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          locationCategorySelect.appendChild(option);
        });
      
        article.appendChild(createField('Location Category*', locationCategorySelect));

      
        // Total Pay
        const totalPayInput = document.createElement('input');
        totalPayInput.type = 'number';
        totalPayInput.id = 'totalPay';
        totalPayInput.name = 'total_pay';
        totalPayInput.min = '0';
        totalPayInput.placeholder = 'e.g. 1000';
        totalPayInput.className = 'w-full border border-gray-300 p-2 rounded';
        article.appendChild(createField('Total Pay*', totalPayInput));

        // Duration in months
        const totalDuration = document.createElement('input');
        totalDuration.type = 'number';
        totalDuration.id = 'totalDuration';
        totalDuration.name = 'total_duration';
        totalDuration.min = '0';
        totalDuration.placeholder = 'e.g. 12';
        totalDuration.className = 'w-full border border-gray-300 p-2 rounded';
        article.appendChild(createField('Duration in Months*', totalDuration));

        // New: Milestones Section
        const milestonesSection = document.createElement('section');
        milestonesSection.className = 'mb-4';
        
        const milestonesLabel = document.createElement('label');
        milestonesLabel.className = 'block text-gray-700 font-semibold mb-2';
        milestonesLabel.textContent = "Milestones*";
        milestonesSection.appendChild(milestonesLabel);
        
        // Number of Milestones
        const milestoneCountInput = document.createElement('input');
        milestoneCountInput.type = 'number';
        milestoneCountInput.id = 'milestoneCount';
        milestoneCountInput.name = 'milestone_count';
        milestoneCountInput.min = '1';
        milestoneCountInput.placeholder = 'Number of Milestones';
        milestoneCountInput.className = 'w-full border border-gray-300 p-2 rounded mb-4';
        milestonesSection.appendChild(milestoneCountInput);

        const milestoneFieldsContainer = document.createElement('div');
        milestoneFieldsContainer.id = 'milestoneFieldsContainer';
        milestonesSection.appendChild(milestoneFieldsContainer);

        article.appendChild(milestonesSection);


           // Update milestones UI
            milestoneCountInput.addEventListener('input', () => {
              const numberOfMilestones = parseInt(milestoneCountInput.value) || 0;
              milestoneFieldsContainer.innerHTML = ''; // Clear current fields

              for (let i = 0; i < numberOfMilestones; i++) {
                const milestoneTitleInput = document.createElement('input');
                milestoneTitleInput.type = 'text';
                milestoneTitleInput.id = `milestoneTitle${i}`;
                milestoneTitleInput.name = `milestone_title_${i}`;
                milestoneTitleInput.placeholder = `Milestone ${i + 1} Title`;
                milestoneTitleInput.className = 'w-full border border-gray-300 p-2 rounded mb-2';
                
                const milestoneDescriptionInput = document.createElement('textarea');
                milestoneDescriptionInput.id = `milestoneDescription${i}`;
                milestoneDescriptionInput.name = `milestone_description_${i}`;
                milestoneDescriptionInput.placeholder = `Milestone ${i + 1} Description`;
                milestoneDescriptionInput.className = 'w-full border border-gray-300 p-2 rounded mb-2';

                const milestoneAmountInput = document.createElement('input');
                milestoneAmountInput.type = 'number';
                milestoneAmountInput.id = `milestoneAmount${i}`;
                milestoneAmountInput.name = `milestone_amount_${i}`;
                milestoneAmountInput.min = '0';
                milestoneAmountInput.placeholder = `Milestone ${i + 1} Payment Amount`;
                milestoneAmountInput.className = 'w-full border border-gray-300 p-2 rounded mb-4';

                // Append each milestone input group
                milestoneFieldsContainer.appendChild(milestoneTitleInput);
                milestoneFieldsContainer.appendChild(milestoneDescriptionInput);
                milestoneFieldsContainer.appendChild(milestoneAmountInput);
              }
            });



      
        // Submit Button
        const footer = document.createElement('footer');
        const postJobButton = document.createElement('button');
        postJobButton.id = 'jpostJobBtn';
        postJobButton.type = 'submit';
        postJobButton.textContent = 'Post Job';
        postJobButton.className = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded';
        footer.appendChild(postJobButton);
        article.appendChild(footer);
      
        // Append the complete article to the section
        displaySection.appendChild(article);

        const btnSubmit = document.getElementById("jpostJobBtn");
      let uid = sessionStorage.getItem('firebaseId');

      btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Disable button during submission
      btnSubmit.disabled = true;
      btnSubmit.textContent = "Posting...";

      try {
          // Validate and collect form data
          const totalPay = parseFloat(document.getElementById("totalPay").value);
          if (isNaN(totalPay) || totalPay <= 0) {
              throw new Error("Please enter a valid payment amount");
          }

          const formData = {
              client_id: uid,
              job_title: document.getElementById("jobTitle").value.trim(),
              job_description: document.getElementById("jobDescription").value.trim(),
              job_requirements: document.getElementById("jobRequirements").value.trim(),
              job_category: document.getElementById("jobCategory").value,
              location_category: document.getElementById("locationCategory").value,
              duration_months: parseInt(document.getElementById("totalDuration").value),
              total_pay: totalPay,
              taken_status: false,
              milestones: []
          };

            // Collect milestones data
            let total = 0;
            const numberOfMilestones = parseInt(milestoneCountInput.value) || 0;
            for (let i = 0; i < numberOfMilestones; i++) {
                const milestoneTitle = document.getElementById(`milestoneTitle${i}`).value.trim();
                const milestoneDescription = document.getElementById(`milestoneDescription${i}`).value.trim();
                const milestoneAmount = parseFloat(document.getElementById(`milestoneAmount${i}`).value);

                if (milestoneTitle && milestoneDescription && !isNaN(milestoneAmount) && milestoneAmount > 0) {
                  total += milestoneAmount;
                    formData.milestones.push({
                        milestone_title: milestoneTitle,
                        description: milestoneDescription,
                        amount: milestoneAmount,
                        status: 'pending'
                    });
                } else {
                    throw new Error(`Please fill in all fields for Milestone ${i + 1}`);
                }
            }

            if(total != totalPay){
              alert("THe milestone payment does not correspond to the total amount");
              return;
            }

          // Validate required fields
          if (!formData.job_title || !formData.job_description || !formData.job_requirements || !formData.job_category) {
              throw new Error("Please fill all required fields");
          }

          console.log("Submitting job:", formData);

          const response = await fetch(`${baseURL}/job/add-job`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `Server Error: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Success:", result);
          
          // Show success message
          alert("Job posted successfully!");
          
          // Clear form fields
          document.getElementById("jobTitle").value = "";
          document.getElementById("jobDescription").value = "";
          document.getElementById("jobRequirements").value = "";
          document.getElementById("jobCategory").value = "";
          document.getElementById("totalPay").value = "";
          document.getElementById("locationCategory").value = "";
          document.getElementById("totalDuration").value = "";
          document.getElementById("milestoneCount").value = "";

      } catch (err) {
          console.error("Job posting failed:", err);
          alert(err.message || "There was an error posting the job. Please try again.");
      } finally {
          // Re-enable button
          btnSubmit.disabled = false;
          btnSubmit.textContent = "Post Job";
      }
  });
}

  buildJobPostForm();

  function setActiveLink(activeId) {
    // Remove active classes from all links
    const navLinks = document.querySelectorAll('nav li');
    navLinks.forEach(link => {
      link.classList.remove('bg-blue-800', 'rounded', 'px-2', 'py-1');
    });
  
    // Add active classes to the clicked link
    const activeLink = document.getElementById(activeId);
    activeLink.classList.add('bg-blue-800', 'rounded', 'px-2', 'py-1');
  }

  document.getElementById('post_job').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link navigation behavior
    setActiveLink('post_job'); // Change the active link color
    buildJobPostForm();
  });
    
});





  