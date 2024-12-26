<script>
    import Goback from "../../goback.svelte";
</script>



<div id="page-cont">
    <div id="back">
        <Goback/>
    </div>
    <div id="container">
        <div id="complete">
            <div class="h3wrap">
                <h3>Completed</h3>
            </div>
            <div class="img-container">
                <img class="images" src="/icons8-complete-50.png" alt="box with checkmark">
            </div>
            <div class="h3wrap">
                <h3>Projects</h3>
            </div>
        </div>
        <div id="incomplete">
            <div class="h3wrap">
                <h3>Under</h3>
            </div>
            <div class="img-container">
                <img class="images" src="/icons8-construction-50.png" alt="under construction">
            </div>
            <div class="h3wrap">
                <h3>Construction</h3>
            </div>
        </div>
    </div>
</div>





<style>
    #page-cont {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        width: 100dvw;
    }
    #container {
        display:flex;
        flex-direction: row;
        width:fit-content;
        height: fit-content;
        position: absolute;
        top: 7.5%;
        left:50%;
        transform: translateX(-50%);
    }
    #complete {
        background-color: rgba(245,245,245,0.2);
        height: 90dvh;
        width: 47.5dvw;
        margin-right: 20px;
        border-radius: 10px;
        display:flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    #incomplete {
        background-color: rgba(245,245,245,0.2);
        height: 90dvh;
        width: 47.5dvw;
        left:75%;
        border-radius: 10px;
        display:flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    #back{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
    }
    .images {
        filter: invert(1) brightness(2);
        position:relative;
        left:50%;
        top: 2.5%;
        transform: translateX(-50%);
        max-width: 100%;
        max-height: 100%;
    }
    .h3wrap {
        width: 20dvw;
        height: fit-content;
        text-align: center;
    }
</style>