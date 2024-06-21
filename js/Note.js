export default class Note{
    constructor(title, body, date, id){
        this._title = title,
        this._body = body,
        this._date = date,
        this._id = id
    }
    get htmlString(){
        return `
            <div class="note">
                <div class="title">
                    <h2>${this._title}</h2>
                    <span id="date">${this._date}</span>
                </div>
                <p>${this._body}</p>
            </div>
        `
    }
}