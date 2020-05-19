const getTodoElement = todo => {
    const { text, completed } = todo;
    return `
    <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
            
        </div>
    
    </li>
    `
}