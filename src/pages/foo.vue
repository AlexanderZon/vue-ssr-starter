<template>
    <div>
        <div>
            <h1>Foo</h1>
        </div>
        <div>
            <input v-model="text"/>
        </div>
        <div>
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Foo',
    data(){
        return {
            text: "Test"
        }
    }
}
</script>