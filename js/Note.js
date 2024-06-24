export default class Note{
    constructor(title, body, date, id){
        this._title = title,
        this._body = body,
        this._date = date,
        this._id = id
    }
    get htmlString(){
        return `
            <div class="note ${this._id}">
                <div class="title">
                    <h2>${this._title}</h2>
                     <div class="info">
                        <span id="date">${this._date}</span>
                        <div class="option-buttons">
                            <input type="button" value="Update" id="updateBtn" class="btn">
                            <input type="button" value="Delete" id="deleteBtn" class="btn">      
                        </div>   
                    </div>
                </div>
                <p>${this._body}</p>
            </div>
        `
    }
}