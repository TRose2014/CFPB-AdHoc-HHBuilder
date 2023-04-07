'use strict';

const familyMembers = [];

  // function for doing a forEach with an HTMLList
let loopEach = function (array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

const addFamilyMember = document.querySelector('button.add');
const submitFamily = document.querySelector('button[type=submit]');
const form = document.querySelector('form');

//adding event listener for adding family members
addFamilyMember.addEventListener('click', function(event) {
  event.preventDefault();

  //getting values from inputs
  const age = document.getElementById('age').value;
  const rel = document.getElementById('rel').value;
  const smoker = document.getElementsByName('smoker')[0].checked;

  let errors = '';

  //converting age to a number
  const convertAgetoNum = Number(age);
  
  if (age == ' ' || convertAgetoNum <= 0) {
    errors += `Age is a required field and must be greater than 0 \n`;
  }

  if (rel == '') {
    errors += `Relationship is a required field`;
  }

     // if there are errors, display erros in alert box
  if (errors != '') { 
    alert(errors); 
    event.preventDefault();
    errors = '';
    return;
  }

  //create familyMember obj
  const familyMember = {
    id: Math.floor(Math.random() * 100),
    age: convertAgetoNum,
    rel: rel,
    smoker: smoker
  }

  familyMembers.push(familyMember);
  console.log(familyMembers);

form.reset();

  //create a div for each family member you add with some info
  let element = document.createElement('div');
      element.setAttribute('id', familyMember.id);
      element.setAttribute('class', 'family-member');
      element.innerHTML = `Family Member # ${familyMembers.length}: Age: ${convertAgetoNum}. Relationship: ${rel}. Smoker: ${smoker}. `;

  //create a  corresponding delete button for each family member added to the DOM
  let button = document.createElement('button');
      button.setAttribute('id', familyMember.id);
      button.innerHTML = 'delete';
      button.addEventListener('click', function(e) {
        element.parentNode.removeChild(element);
        function findMember(mbr) { 
          return mbr.id === Number(e.target.id);
      };

        let targetMember = familyMembers.find(findMember);
        console.log(targetMember)

      });

      element.appendChild(button);

      // add new family mbr to DOM
      document.body.appendChild(element);

});

/**
 * Add people to household list
 */
submitFamily.addEventListener('click', function(event) {
  event.preventDefault();
  //stores the IDs grabbed from final family list
  let familyMemberIds = [];
  let familyMembersJSON = {};
  // get all items from family members list
  let familyList = document.getElementsByClassName('family-member');


  // go through each family mbr and extract the id
  loopEach(familyList, function (index, value) {
      console.log(value.id)
      familyMemberIds.push(value.id);
  });

  // loop through the array of family member IDs, find corresponding objects in the familyMembers array, and store those objects inside of the final JSON object
  familyMemberIds.forEach(function(id){
      function findMember(familyMembers) { 
          return familyMembers.id === Number(id);
      }
      const thisMember = familyMembers.find(findMember);

      // add object to final object with all family members
      familyMembersJSON[id] = thisMember;
  });

  //place JSON into the pre tag with class "debug"
  let preTagNode = document.querySelector('pre.debug');

  preTagNode.innerHTML = JSON.stringify(familyMembersJSON);
  preTagNode.style.display = "block";

  console.log('you submitted a form with: ' + JSON.stringify(familyMembersJSON));
          
});
