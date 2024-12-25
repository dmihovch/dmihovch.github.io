
<script>
    import Goback from "../../goback.svelte";
</script>
<div id="back">
    <Goback/>
</div>

<body>
    <embed id="resume" title=""src="/Dan-Mihovch-resume-dec24.pdf">
</body>



<style>
    #resume {
        position: absolute;
        top:7.5%;
        width:100%;
        height: 100dvi;
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

