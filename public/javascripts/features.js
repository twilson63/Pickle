var MyFeature = {
  MyScenario: function () {
    Given("I should see Hello");
    And("I should see BiteMe");
    When("I fill in Name with Tom");
    Then("I press Save");
    And("I should see Everything");
    And("I have a million dollars");
    
  }
}

var HaveAMillion = {
  instruction: /^I have a million dollars$/,
  test: function () {
    return true;
  }
}

Steps[Steps.length] = HaveAMillion;

var ManageMedicationsFeature = {
  Description: "As a Provider I want to be able to list medications",
  ListMedicationsScenario: function () {
    Given("I am on the offline page");
    And("I follow 'Encounter'");
    When("I follow 'Medications'");
    Then("I should see 'Medication 1'");
  }
}