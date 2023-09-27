function skillsMember(){
    this.name = "";
    this.skills = [];
    this.addSkill = function(skill){
        this.skills.push(skill);
    }
    this.showSkills = function(){
        console.log(this.name + " has skills: " + this.skills.join(", "));
    }
}