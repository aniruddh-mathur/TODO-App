const person = {
    name:'Aniruddh Mathur',
    address: {
        line1 : '123 Baker Street ',
        city:'London',
        country: 'UK'
    },
    profiles: ['twitter','LinkedIn','Instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )
    }
}

function LearningJavaScript(){
    return (
        <div>
        <div>{person.name}</div>
        <div>{person.address.line1}</div>
        <div>{person.profiles[0]}</div>
        <div>{person.printProfile()}</div>
        </div>
    );
}

export default LearningJavaScript