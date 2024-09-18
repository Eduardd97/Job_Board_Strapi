import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Apply() {
    const queryParams = new URLSearchParams(window.location.search);
    const jobid = queryParams.get("jobid");
    const [job, setJob] = useState([]);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");
    const [jobFound, setJobFound] = useState(false); // Для отслеживания наличия вакансии

    const update = async () => {
        fetch("http://localhost:1337/api/joblists/")
            .then((res) => res.json())
            .then((job_info) => {
                const foundJob = job_info.data.find((j) => j.id === parseInt(jobid, 10));
                setJob(foundJob || []);
                setJobFound(!!foundJob);
            });
    };

    useEffect(() => {
        update();
    }, [jobid]);

    const submit = async () => {
        if (!jobFound) {
            alert("Job not found. Cannot submit application.");
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    name: fullname,
                    email: email,
                    message: message,
                    portfolio_Link: link,
                    state: "Pending",
                    job_id: jobid,
                },
            }),
        };

        fetch("http://localhost:1337/api/applicantlists", requestOptions)
            .then((response) => response.json())
            .then(() => {
                alert("Application Submitted Successfully!");
            });
    };

    return (
        <div>
            <div className='header'>
                <link
                    href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
                    rel='stylesheet'
                ></link>
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'></script>
                <div>
                    <div className='menu1'>
                        <Link to='/'>Job Board</Link>
                    </div>

                    <div className='menu2'>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <div
                    className='job2'
                    style={{
                        float: "left",
                        marginLeft: "150px",
                        width: "600px",
                    }}
                >
                    <br />
                    <br />
                    {jobFound && job ? (
                        <div>
                            <div
                                className='detailds_'
                                style={{
                                    backgroundColor: "white",
                                    height: "500px",
                                    width: "100%",
                                    border: "3px solid #f8f9fc",
                                    borderTopLeftRadius: "9px",
                                    borderTopRightRadius: "9px",
                                }}
                            >
                                <img
                                    src='https://super-static-assets.s3.amazonaws.com/e7c0f16c-8bd3-4c76-8075-4c86f986e1b2/uploads/favicon/9c68ae10-0a8a-4e3f-9084-3625b19df9cb.png'
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        border: "3px solid pink",
                                        marginLeft: "40px",
                                        marginTop: "18px",
                                        borderRadius: "10px",
                                        marginLeft: "44%",
                                    }}
                                />
                                <div
                                    style={{
                                        float: "left",
                                        marginTop: "27px",
                                        marginLeft: "18px",
                                        width: "100%",
                                    }}
                                >
                                    <center>
                                        <span className='span1_'>
                                            <b>{job.jobPosition}</b>
                                        </span>
                                        <br />
                                        <span className='span1_'>
                                            {job.location}
                                        </span>
                                        <br />
                                        <br />
                                        <span>{job.jobDescription} </span>
                                    </center>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div>
                                        <span>
                                            <b>{job.experience}</b>
                                        </span>{" "}
                                        <br />
                                        <br />
                                        <span>
                                            <b>Category : {job.category}</b>
                                        </span>{" "}
                                        <br />
                                        <br />
                                        <span>
                                            <b>Company : {job.agency}</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Job not found</div>
                    )}
                </div>

                <div
                    className='job2'
                    style={{
                        float: "right",
                        marginLeft: "20px",
                        height: "500px",
                        width: "400px",
                        borderRadius: "10px",
                        marginRight: "160px",
                    }}
                >
                    <br />
                    <br />
                    <div>
                        <div
                            className='details_'
                            style={{
                                backgroundColor: "white",
                                height: "500px",
                                width: "100%",
                                border: "3px solid #f8f9fc",
                                borderTopLeftRadius: "9px",
                                borderTopRightRadius: "9px",
                            }}
                        >
                            <center>
                                <br />
                                <h4>Application form</h4>
                                <form>
                                    <div className='form-group'>
                                        <input
                                            type='text'
                                            onChange={(event) =>
                                                setFullname(event.target.value)
                                            }
                                            className='form-control'
                                            placeholder='Enter Fullname'
                                            style={{ borderRadius: "10px" }}
                                            id='usr'
                                        />
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <input
                                            type='email'
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            className='form-control'
                                            placeholder='Enter Email Address'
                                            style={{ borderRadius: "10px" }}
                                            id='usr'
                                        />
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <input
                                            type='url'
                                            onChange={(event) =>
                                                setLink(event.target.value)
                                            }
                                            className='form-control'
                                            placeholder='Link to Your Portfolio'
                                            style={{ borderRadius: "10px" }}
                                            id='usr'
                                        />
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <textarea
                                            onChange={(event) =>
                                                setMessage(event.target.value)
                                            }
                                            className='form-control'
                                            rows='6'
                                            placeholder='Tell us more about you and your experience'
                                            style={{ borderRadius: "10px" }}
                                        ></textarea>
                                        <br />
                                        <input
                                            type='button'
                                            onClick={submit}
                                            className='form-control'
                                            value='Submit'
                                        />
                                    </div>
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apply;
