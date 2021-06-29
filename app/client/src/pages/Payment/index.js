import React from 'react';
import { post } from '../../api'
function Payment() {
    const [amount, setAmount] = React.useState(0);
    const [description, setDescription] = React.useState("")
    const [callbackUrl, setCallBackUrl] = React.useState("")
    const [name, setName] = React.useState("")
    const [contact, setContact] = React.useState("+91")
    const [email, setEmail] = React.useState("")
    const [note, setNote] = React.useState("")

    const onSubmit = () => {
        let obj = {
            "amount": amount,
            "description": description,
            "customer": {
                "name": name,
                "contact": contact,
                "email": email
            },
            "notes": {
                "policy_name": note
            },
            "callback_url": callbackUrl
        }
        post("api/payment", obj)
            .then((res) => {
                window.location = res.data.short_url;
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 p-5 bg-white mx-auto text-dark my-5 shadow">
                    <lable>Amount in minimum value</lable>
                    <input type="number" value={amount} className="form-control" onChange={(t) => setAmount(t.target.value)} />
                    <div className="text-success">Rs. {(amount / 100).toFixed(2)}</div>
                    <lable>Description</lable>
                    <input type="text" value={description} onChange={(t) => setDescription(t.target.value)} className="form-control" />
                    <lable>Callback URL</lable>
                    <input type="url" className="form-control" value={callbackUrl} onChange={(t) => setCallBackUrl(t.target.value)} />
                    <hr />
                    <lable>Customer Name</lable>
                    <input type="text" className="form-control" value={name} onChange={(t) => setName(t.target.value)} />
                    <lable>Customer Contact</lable>
                    <input type="text" className="form-control" value={contact} onChange={(t) => setContact(t.target.value)} />
                    <lable>Customer Email</lable>
                    <input type="text" className="form-control" value={email} onChange={(t) => setEmail(t.target.value)} />
                    <lable>Note</lable>
                    <input type="text" className="form-control" value={note} onChange={(t) => setNote(t.target.value)} />
                    <div className="mt-3">
                        <a
                            href="#/"
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmit()
                            }}
                            className="btn btn-success"
                        >
                            Submit
            </a>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Payment;