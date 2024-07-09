<template>
    <div class="topElements">
        <div>
            <SearchBar></SearchBar>
        </div>
        <div>
            <notificationMenager></notificationMenager>
        </div>
    </div>
        
</template>

<script>
import SearchBar from '../components/Search-Bar/Search-bar.vue'
import notificationMenager from '../components/Notifications/notificationMenager.vue'

export default {
    components: {
        SearchBar,
        notificationMenager
    }
}
</script>