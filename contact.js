
function Contact(name, email, phone, address) {
    this.name = name;
    this.email = email;
    this.tel = phone;
    this.address = address;
}



Contact.prototype.vcard = function () {

    return'BEGIN:VCARD\n' +
        'VERSION:2.1\n' +
        'FN:' + this.name + '\n' +
        'TEL;HOME;VOICE:' + this.tel + '\n' +
        'ADR;HOME:' + this.address + '\n' +
        'END:VCARD';
};

Contact.prototype.getDownloadLink = function () {
    var a = document.createElement('a');
    a.href = 'data:text/plain;utf-8,' + this.vcard();
    a.innerHTML = this.name;
    a.download = this.name + '.vcf';
    return a;
};



document.addEventListener('DOMContentLoaded', function () {
    var trs = Array.prototype.slice.call(document.querySelector('tbody').children);
    var contacts = trs.map(function (tr) {
        /*var name = tr.children[3].firstElementChild.firstElementChild.innerHTML;
        var email = tr.children[4] && tr.children[4].firstElementChild && tr.children[4].firstElementChild.innerHTML;
        var phone = tr.children[5] && tr.children[5].firstElementChild && tr.children[5].firstElementChild.innerHTML;
        var address = tr.children[6] &&  tr.children[6].firstElementChild && tr.children[6].firstElementChild.innerHTML;*/


        var name = tr.children[3].textContent;
        var email = tr.children[4].textContent;
        var phone = tr.children[5].textContent;
        var address = tr.children[6].textContent;


        return new Contact(name, email, phone, address);
    });
    var hyperlinks = contacts.map(function (contact) { return contact.getDownloadLink(); });
    hyperlinks.forEach(appendToPage);

    function appendToPage(element) {
        document.body.appendChild(element);
    }
});



