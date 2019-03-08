// VS start (VH)
const VH = {
    "world" : 9999,
    "guard" : 1,
    "section" : 978101
}
// VS
const VS = {
    "world" : 9999,
    "guard" : 1,
    "section" : 9781
}
// GG entrance
const GGVS = {
    "world" : 9999,
    "guard" : 1,
    "section" : 9714
}
// GG
const GG = {
    "world" : 9999,
    "guard" : 3,
    "section" : 9713
}

module.exports = function vs_location_fix(mod){

    mod.hook('S_FRIEND_LIST', 1, (p) => {
        p.friends.forEach(fix);
        return true;
    });
    mod.hook('S_GUILD_MEMBER_LIST', 1, (p) => {
        p.members.forEach(fix);
        return true;
    });

    function fix(user){
        if(isAtGGentrance(user)) fixGG(user);
        if(isAtVSstart(user)) fixVS(user);
    }

    function isAtVSstart(member){
        return member.location1 == VH.world &&
               member.location2 == VH.guard &&
               member.location3 == VH.section;
    }
    function isAtGGentrance(member){
        return member.location1 == GGVS.world &&
               member.location2 == GGVS.guard &&
               member.location3 == GGVS.section;
    }
    function fixVS(member){
        member.location1 = VS.world;
        member.location2 = VS.guard;
        member.location3 = VS.section;
    }
    function fixGG(member){
        member.location1 = GG.world;
        member.location2 = GG.guard;
        member.location3 = GG.section;
    }

}