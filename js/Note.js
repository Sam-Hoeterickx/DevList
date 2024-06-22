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
                        <input type="button" value=":" id="options">
                    </div>
                </div>
                <p>${this._body}</p>
            </div>
        `
    }
}