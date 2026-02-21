const payload = {
    imageAnalysis: {},
    userText: "Product showcase",
    tags: ["Luxury Commercial", "Dramatisch", "Studio Setup"],
    tagContributions: [
        "Use a high-end commercial aesthetic. Ensure flawless execution with aspirational quality.",
        "Lighting should be dramatic and moody.",
        "Set the scene in a controlled studio environment."
    ],
    tone: "luxury",
    duration: "8",
    mode: "video",
    useCase: "produkt",
    useCaseInstruction: "Focus on product detail accuracy above all else."
};

fetch("http://localhost:3000/api/build-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
})
    .then(r => r.json())
    .then(d => {
        console.log(JSON.stringify(d, null, 2));
    })
    .catch(e => console.error(e));
