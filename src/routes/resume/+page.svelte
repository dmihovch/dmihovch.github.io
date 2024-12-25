
<script>
    import Goback from "../../goback.svelte";
</script>
<div id="back">
    <Goback/>
</div>

<body>
    <img id="resume" src="/download.png" alt="resume">
</body>



<style>
    #resume {
        position: absolute;
        top:7.5%;
        left:50%;
        transform: translateX(-50%);
        width: auto;
        height: auto;
        overflow: scroll;
    }
    body{
        overflow:scroll;
    }
    #back{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
    }
</style>

