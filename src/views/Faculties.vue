<template>
    <div class="faculties-page">
        <div class="container page">
            <div class="content-box">
                <div class="row">
                    <div class="col-md-8">
                        <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> Нельзя удалить факультет, в котором записаны студенты.
                            <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div v-if="errorAdd" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> Заполните все поля.
                            <button type="button" @click="closeWarningAdd" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div v-if="loading">Loading...</div>
                        <div v-else>
                            <table class="table table-striped table-dark text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Год</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="faculty in faculties" v-bind:key="faculty.id">
                                        <th scope="row">{{ faculty.id }}</th>
                                        <td>{{ faculty.name }}</td>
                                        <td>{{ faculty.year }}</td>
                                        <div class="float-right">
<!--                                            <td><button class="btn btn-delete" :data-faculty-id="faculty.id"><i class="fas fa-pen"></i></button></td>-->
                                            <td><button class="btn btn-delete" @click="deleteFaculty(faculty.id)" :data-faculty-id="faculty.id"><i class="fa fa-close"></i></button></td>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-box bg-dark">
                            <form class="form-add-faculty" @submit.prevent="addFacultyForm">
                                <div class="text-center form-title-box">
                                    <p>Добавить факультет</p>
                                </div>
                                <div class="form-group row">
                                    <label for="form-add-faculty-name" class="col-sm-3">Название</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" v-model="addFacultyName" name="faculty_name" id="form-add-faculty-name" placeholder="Название">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="form-add-faculty-year" class="col-sm-3">Год</label>
                                    <div class="col-sm-9">
                                        <Datepicker id="form-add-faculty-year" class="form-add-faculty-datepicker" @setYear='setYear'/>
                                    </div>
                                </div>
                                <div class="text-center form-btn-box">
                                    <button type="submit" class="btn btn-primary">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import facultiesApi from '@/api/faculty';
    import Datepicker from "@/components/Datepicker";

    export default {
        name: 'TpFaculties',
        components: {
            Datepicker
        },
        data() {
            return {
                loading: false,
                errorDelete: false,
                errorAdd: false,
                faculties: [],
                addFacultyName: '',
                addFacultyYear: '',
                facultyId: '',
            }
        },
        methods: {
            addFacultyForm: function () {
                if (this.addFacultyName == '' || this.addFacultyYear == '') {
                    this.errorAdd = true;
                    return;
                }
                const formData = {
                    name: this.addFacultyName,
                    year: this.addFacultyYear,
                };
                facultiesApi.addFaculty(formData)
                    .then(async res => {
                        console.log(res);
                        this.loading = true;
                        this.faculties = await facultiesApi.getFaculties();
                        this.loading = false;
                        this.addFacultyName = '';
                        this.addFacultyYear = '';
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            deleteFaculty: function (id) {
                console.log(id);
                facultiesApi.deleteFaculty(id)
                    .then(async (results) => {
                        console.log(results)
                        this.loading = true;
                        this.faculties = await facultiesApi.getFaculties();
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorDelete = true;
                    })
                this.loading = false;
            },
            setYear (data) {
                this.addFacultyYear = data.year;
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            closeWarningAdd: function () {
                this.errorAdd = false;
            }
        },
        mounted() {
            this.loading = true;
            facultiesApi.getFaculties()
                .then((results) => {
                    this.faculties = results;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        }
    }
</script>

<style>
    .form-add-faculty-datepicker .mx-datepicker {
        width: 100%;
    }
</style>

