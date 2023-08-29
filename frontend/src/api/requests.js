import axios from '../api/axios';

export class requestData {
    constructor(data) {
        this.data = data
    }

    auth() {
        return {
            email: this.data.email,
            password: this.data.password
        }
    }

    task() {
        return {
            task_name: this.data.task_name,
            comment: this.data.comment,
            deadline: this.data.deadline,
        }
    }

    isFinished() {
        return {
            task_name: this.data.task_name,
            comment: this.data.comment,
            deadline: this.data.deadline,
            is_finished: this.data.is_finished
        }
    }

    newPassword() {
        return {
            uid: this.data.uid,
            token: this.data.token,
            new_password: this.data.password,
        }
    }

    newEmail() {
        return {
            uid: this.data.uid,
            token: this.data.token,
            new_email: this.data.email,
        }
    }
}


export class requestAPI {
    constructor(props) {
        this.data = props.data;
        this.request = props.request;
        this.accesstoken = props.accesstoken;
        this.url = props.url;
    }

    headers() {
        return {
            'Content-Type': 'Application/json',
            'Authorization': `JWT ${this.accesstoken}`,
        }
    }

    async get() {
        if (this.accesstoken === undefined) {
            return await axios.get(this.url)
        } else {
            return await axios.get(this.url, { headers: this.headers() })
        }
    }

    async post() {
        if (this.accesstoken === undefined) {
            return await axios.post(this.url, this.request)
        } else {
            return await axios.post(this.url, this.request, { headers: this.headers() })
        }
    }

    async put() {
        if (this.accesstoken === undefined) {
            return await axios.put(this.url + `${this.data.id}/`, this.request)
        } else {
            return await axios.put(this.url + `${this.data.id}/`, this.request, { headers: this.headers() })
        }
    }

    async delete() {
        if (this.accesstoken === undefined) {
            return await axios.delete(this.url + `${this.data.id}/`)
        } else {
            return await axios.delete(this.url + `${this.data.id}/`, { headers: this.headers() })
        }
    }

    async deleteAccount() {
            // axios.dalete()のbodyは{ data: boby }の形式
            return await axios.delete(this.url,  { headers: this.headers(), data: this.request })
    }
}