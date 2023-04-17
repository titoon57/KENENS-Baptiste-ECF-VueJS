<template>
    <table class="table my-5 table-striped table-hover">
      <thead>
        <slot name="head">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Entreprise</th>
            <th scope="col">Date d'ajout</th>
            <th scope="col">Action</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped></style>
  