module.exports = function vs_location_fix(mod) {
    
    const VH   = { "world": 9999, "guard": 1, "section": 978101 } // VSN start (VH)
    const VSN  = { "world": 9999, "guard": 1, "section": 9781 }   // VSN
    const VHH  = { "world": 9999, "guard": 1, "section": 998101 } // VSH start (VH)
    const VSH  = { "world": 9999, "guard": 1, "section": 9981 }   // VSN
    const GGVS = { "world": 9999, "guard": 1, "section": 9714 }   // GG entrance
    const GG   = { "world": 9999, "guard": 3, "section": 9713 }   // GG

    mod.hook('S_FRIEND_LIST', 1, (p) => {
        p.friends.forEach(fix);
        return true;
    });

    mod.hook('S_GUILD_MEMBER_LIST', 1, (p) => {
        p.members.forEach(fix);
        return true;
    });

    function fix(user) {
        checkAndFix(user, VH, VSN);
        checkAndFix(user, VHH, VSH);
        checkAndFix(user, GGVS, GG);
    }

    function checkAndFix(user, loc, correctLoc) {
        if (isAtLocation(user, loc)) fixLocation(user, correctLoc);
    }

    function isAtLocation(u, l) {
        return u.location1 == l.world &&
            u.location2 == l.guard &&
            u.location3 == l.section;
    }

    function fixLocation(u, l) {
        u.location1 = l.world;
        u.location2 = l.guard;
        u.location3 = l.section;
    }

}