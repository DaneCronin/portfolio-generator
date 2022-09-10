const inquirer = require('inquirer');



//function to ask for user name input in CLI
const fs = require('fs');
const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);




// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
    
//     console.log('Portfolio Complete! Checkout index.html to see the output!');
// });

const promptUser = () => {
    
 return inquirer.prompt([
   
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: gitHubNameInput => {
                if (gitHubNameInput) {
                    return true;
                } else {
                    console.log('Please enter your github name!');
                    return false;
                }
            }
          },
          {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true

          },
          {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
          }
        ]);
      };
       
      const promptProject = portfolioData => {

        console.log(`
        =================
        Add a New Project
        =================
        `);

        // If there's no 'projects' array property, create one
        if (!portfolioData.projects) {
            portfolioData.projects = [];
            }
    
        return inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescriptionInput => {
                if (projectDescriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a project description!');
                    return false;
                }
            }
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: projectLinkInput => {
                if (projectLinkInput) {
                    return true;
                } else {
                    console.log('Please enter a link to the project on GitHub!');
                    return false;
                }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
          });
      };

    promptUser()
    //.then(answers => console.log(answers))
    .then(promptProject)
   // .then(projectAnswers => console.log(projectAnswers))
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
        
      });


