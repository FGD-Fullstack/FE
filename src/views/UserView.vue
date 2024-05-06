<script>
import { UserService } from "../../services/userService";
import { Modal } from "bootstrap";
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      users: [],
      getEditUser: {},
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      UserService.getAll().then((response) => {
        this.users = response.data;
      });
    },

    editUser(user) {
      UserService.getOne(user.id).then((response) => {
        this.getEditUser = response.data;
        this.openEditUserModal();
      });
    },
    openEditUserModal() {
      let myModal = new Modal(document.getElementById("editUserModal"));
      myModal.show();
    },
    saveUser() {
      UserService.update(this.getEditUser.id, this.getEditUser).then(
        (response) => {
          location.reload();
        }
      );
    },
    addUser() {
      let name = document.getElementById("addUserName").value;
      let email = document.getElementById("addUserEmail").value;
      UserService.create({ fullName: name, email: email }).then((response) => {
        location.reload();
      });
    },
    deleteUser(user) {
      UserService.delete(user.id).then((response) => {
        location.reload();
      });
    },
  },
};
</script>

<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addUserModal"
    >
      Tambah User
    </button>
    <!-- Edit Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="editUserModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Edit user form -->
            <form @submit.prevent="saveUser">
              <div class="mb-3">
                <label for="editUserName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="editUserName"
                  v-model="getEditUser.fullName"
                />
              </div>
              <div class="mb-3">
                <label for="editUserEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="editUserEmail"
                  v-model="getEditUser.email"
                />
              </div>
              <button type="submit" class="btn btn-primary">Ubah</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="addUserModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- ADD user form -->
            <form @submit.prevent="addUser">
              <div class="mb-3">
                <label for="addUserName" class="form-label">Name</label>
                <input type="text" class="form-control" id="addUserName" />
              </div>
              <div class="mb-3">
                <label for="addUserEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="addUserEmail" />
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nama</th>
          <th scope="col">Email</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="editUser(user)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteUser(user)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
