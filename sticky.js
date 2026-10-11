const noteSection = document.getElementById('notes-section');
const add=document.getElementById('add-note');
const noteInput=document.getElementById('note-input');
let noteCount = 0;
add.addEventListener('click',()=>{
    const text=noteInput.value;
    if(text.trim()!==''){
        const note=document.createElement('div');
        note.classList.add('note');
        note.textContent=text;
        noteSection.appendChild(note);
        noteInput.value='';
        if(noteCount%2===0){
            note.style.backgroundColor = '#d1e1ff';
        }else{
            note.style.backgroundColor = '#fefffe';
        }
        noteCount++;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-note');

        deleteButton.addEventListener('click', () => {
            note.remove();
});
note.appendChild(deleteButton);
        noteSection.appendChild(note);

        noteInput.value = '';
    }
});